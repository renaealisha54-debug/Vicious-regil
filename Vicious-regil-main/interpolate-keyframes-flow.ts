'use server';
/**
 * @fileOverview This file defines a Genkit flow for interpolating keyframes to generate intermediate 'tween' frames.
 *
 * - interpolateKeyframes - A function that interpolates between two keyframes.
 * - InterpolateKeyframesInput - The input type for the interpolateKeyframes function.
 * - InterpolateKeyframesOutput - The return type for the interpolateKeyframes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PosePointSchema = z.object({
  x: z.number().describe('The X coordinate of the point.'),
  y: z.number().describe('The Y coordinate of the point.'),
});

const KeyframeSchema = z.record(z.string(), PosePointSchema).describe('A keyframe pose, mapping point names (e.g., "head", "leftArm") to their {x, y} coordinates.');

const InterpolateKeyframesInputSchema = z.object({
  startKeyframe: KeyframeSchema.describe('The starting keyframe pose.'),
  endKeyframe: KeyframeSchema.describe('The ending keyframe pose.'),
  numFrames: z.number().int().min(1).describe('The number of intermediate frames to generate between the start and end keyframes.'),
});
export type InterpolateKeyframesInput = z.infer<typeof InterpolateKeyframesInputSchema>;

const InterpolateKeyframesOutputSchema = z.object({
  interpolatedFrames: z.array(KeyframeSchema).describe('An array of interpolated keyframes, representing the smooth transition between the start and end poses.'),
});
export type InterpolateKeyframesOutput = z.infer<typeof InterpolateKeyframesOutputSchema>;

export async function interpolateKeyframes(input: InterpolateKeyframesInput): Promise<InterpolateKeyframesOutput> {
  return interpolateKeyframesFlow(input);
}

const interpolateKeyframesPrompt = ai.definePrompt({
  name: 'interpolateKeyframesPrompt',
  input: {schema: InterpolateKeyframesInputSchema},
  output: {schema: InterpolateKeyframesOutputSchema},
  prompt: `You are an animation assistant. Your task is to generate intermediate poses between a given start keyframe and an end keyframe.\nYou need to produce exactly {{{numFrames}}} intermediate frames.\nFor each point (e.g., 'head', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg') present in the start and end keyframes, you must calculate its 'x' and 'y' coordinates for each intermediate frame using linear interpolation.\nThe interpolation should be smooth and evenly distributed across all intermediate frames.\nIf numFrames is N, then for each intermediate frame k (where k goes from 1 to N), the interpolation factor is (k / (N + 1)).\nThe formula for a point's coordinate (C) at intermediate frame k is:\nC_k = C_start + (C_end - C_start) * (k / (N + 1))\n\nEnsure all point names from the start and end keyframes are present in each interpolated frame.\nThe output must be a JSON object with a single key "interpolatedFrames", which is an array of pose objects. Each pose object must have the same structure as the input keyframes, mapping point names to their 'x' and 'y' coordinates, and ensuring all coordinates are numbers.\n\nStart Keyframe:\n{{{startKeyframe}}}\n\nEnd Keyframe:\n{{{endKeyframe}}}\n\nNumber of Intermediate Frames (N): {{{numFrames}}}\n`,
});

const interpolateKeyframesFlow = ai.defineFlow(
  {
    name: 'interpolateKeyframesFlow',
    inputSchema: InterpolateKeyframesInputSchema,
    outputSchema: InterpolateKeyframesOutputSchema,
  },
  async (input) => {
    const {output} = await interpolateKeyframesPrompt(input);
    return output!;
  }
);
