const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'C:\\Users\\Sehaj\\Downloads\\jascomic\\Jas_of_Duskbloom_FULL.pdf';
const outputPath = 'C:\\Users\\Sehaj\\Downloads\\jascomic\\jasira-veyra\\src\\data\\chapters.ts';

const sceneMap = {
  1: { chapterId: 'ch1', title: 'The Silent Roses', chapterName: 'A Quiet Beginning', chapterNum: 1 },
  2: { chapterId: 'ch1', title: 'The Duskbloom Signal', chapterName: 'A Quiet Beginning', chapterNum: 1 },
  3: { chapterId: 'ch1', title: 'The Athenaeum', chapterName: 'A Quiet Beginning', chapterNum: 1 },
  4: { chapterId: 'ch1', title: 'The Unexpected Ending', chapterName: 'A Quiet Beginning', chapterNum: 1 },
  5: { chapterId: 'ch2', title: 'The Unmarked Book', chapterName: 'The Book With No Author', chapterNum: 2 },
  6: { chapterId: 'ch2', title: 'The Storyboard Keeper', chapterName: 'The Book With No Author', chapterNum: 2 },
  7: { chapterId: 'ch2', title: 'The Vanishing of Elder Vashti', chapterName: 'The Book With No Author', chapterNum: 2 },
  8: { chapterId: 'ch2', title: 'The Elder Who Remembered', chapterName: 'The Book With No Author', chapterNum: 2 },
  9: { chapterId: 'ch3', title: 'The Contract', chapterName: 'The Price of Knowing', chapterNum: 3 },
  10: { chapterId: 'ch3', title: 'The Wasting', chapterName: 'The Price of Knowing', chapterNum: 3 },
  11: { chapterId: 'ch3', title: 'The Long Way Round', chapterName: 'The Price of Knowing', chapterNum: 3 },
  12: { chapterId: 'ch3', title: 'The Sweet Before the Storm', chapterName: 'The Price of Knowing', chapterNum: 3 },
  13: { chapterId: 'ch4', title: 'What the First Attempt Cost', chapterName: 'The Girl Who Returned', chapterNum: 4 },
  14: { chapterId: 'ch4', title: 'The Girl in the Grove', chapterName: 'The Girl Who Returned', chapterNum: 4 },
  15: { chapterId: 'ch4', title: 'The Weight of an Unfinished Heart', chapterName: 'The Girl Who Returned', chapterNum: 4 },
  16: { chapterId: 'ch4', title: 'The Ending She Chooses', chapterName: 'The Girl Who Returned', chapterNum: 4 },
  17: { chapterId: 'ch5', title: 'Bloom', chapterName: 'One Year Later', chapterNum: 5 }
};

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
  let text = data.text;
  // Clean up formatting
  text = text.replace(/\r\n/g, '\n').replace(/\n/g, ' '); // Join lines
  // The pages have numbers, we should try to keep paragraphs
  // Wait, pdf-parse might just return a dump. Let's rely on double spaces or indentation if possible.
  // We'll read the text from pdf and split by parts. 
  // Actually, wait, pdf-parse joins everything.
});
