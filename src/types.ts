/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppSettings {
  partnerName: string;
  age: number;
  birthYearText: string;
  headlineText: string;
  messageText: string;
  musicUrl: string;
  musicTitle: string;
}

export type ScreenType = 'countdown' | 'loader' | 'intro' | 'cake' | 'photos' | 'message';

export const DEFAULT_SETTINGS: AppSettings = {
  partnerName: 'My Girl',
  age: 20,
  birthYearText: 'born 20 years ago today!',
  headlineText: 'My girl was born 20 years ago today!',
  messageText: `Happy Birthday, My Girl! 🎉 You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter, with your pure kindness, and the way you make people feel happy and loved. I hope your day is filled with laughter, surprises, and memories that make your heart happy. 

You're truly one of a kind, and I just want you to know how special you are. Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness, success, and all the sweet things life has to offer. 💖`,
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Highly stable soundhelix audio link
  musicTitle: 'Beautiful Dream Piano'
};
