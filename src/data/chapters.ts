export interface Scene {
  id: string;
  title: string;
  chapterId: string;
  sceneIndex: number;
  content: string[];
  illustration?: string;
  illustrationAlt?: string;
  quote?: string;
  quoteAttribution?: string;
  dialogue?: { speaker: string; text: string }[];
  atmosphereClass: string;
  musicCue?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  description: string;
  scenes: Scene[];
  coverImage?: string;
  isAvailable: boolean;
  unlockRequirement?: string;
}

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    number: 1,
    title: 'A Quiet Beginning',
    description: 'Jasira notices something wrong with the flowers in Duskbloom Wood.',
    isAvailable: true,
    coverImage: '/images/backgrounds/story-bg.webp',
    scenes: [
      {
        id: 'ch1-sc1',
        chapterId: 'chapter-1',
        title: 'The Silent Roses',
        sceneIndex: 1,
        illustration: '/images/story/silent-roses.webp',
        illustrationAlt: 'The roses under Jasira windowsill have lost their scent',
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "Duskbloom Wood was not like other forests. By day it looked ordinary enough — quiet, a little grey, easy to walk past without a second glance. But the moment the moon cleared the treeline, the whole wood remembered what it actually was: every flower opened at once, and the air turned the soft, glowing lilac of something that had been waiting all day to finally breathe.",
          "The elves who lived there didn't cast spells with blades or wands. Their magic lived in feeling — a private well inside each of them called a Verse, tied to whatever they carried in their hearts. Some Verses threw fire. Some raised walls of light strong enough to stop an army. Jasira Veyra's did neither. Hers made small warm light, coaxed shy flowers into blooming a little early, and did something quiet to books that nobody had ever thought to look at closely.",
          "Which was, more or less, the story of Jasira's whole life. Loved by everyone. Relied on by no one. Not because she wasn't capable — simply because nobody had ever needed to find out.",
          "The first thing Jasira Veyra noticed was that the roses under her window had stopped smelling like anything.",
          "She almost didn't mention it. That was the old habit — notice something wrong, feel it fully for exactly four seconds, then fold it up small before anyone could ask if she was okay. Nobody had ever really needed her to notice things before, so she'd stopped expecting her noticing to matter.",
          "Mochi noticed her noticing, though. Ears swiveling toward the window, fur puffing slightly.",
          "\"Probably just an old bush,\" she told him, already reaching for her Bloomverse out of pure habit — the same habit that had her writing down everything she felt, whether or not anyone ever read it. She wrote one line at the bottom of the page:",
          "the flowers went quiet, and I still don't know why I'm the one who noticed.",
          "The page went warm under her palm. A single word bloomed faintly on it and dissolved before she could read it properly. She'd seen her Bloomverse do that a hundred times and never once thought much of it — it was just what it did, a pretty, private little thing, the way some people hummed without noticing. She had absolutely no idea it meant anything. Nobody had ever told her it might.",
          "That was the truth under everything about Jasira: she had real power. She just didn't know it, and neither did anyone else — because nobody had ever needed her enough to look closely."
        ]
      },
      {
        id: 'ch1-sc2',
        chapterId: 'chapter-1',
        title: 'The Duskbloom Signal',
        sceneIndex: 2,
        illustration: '/images/story/hush-tendril.webp',
        illustrationAlt: 'The Duskbloom Signal and Hush-Tendril Breach',
        atmosphereClass: 'bg-ink text-cream',
        content: [
          "She almost forgot about the roses entirely, until two nights later, when the horn sounded twice — the Duskbloom signal for a Hush-tendril breach — and Jasira was already moving before she'd finished pulling her boots on, because some habits don't die even after years of the same result. If nobody was going to ask her to help, she was still going to show up and offer anyway. That was just who she was.",
          "\"Barrier team to the north ridge! Flame-Verses, with me!\" Captain Orlei was already shouting orders by the time Jasira reached the square, three strong elves lighting up gold and red around her, the air cracking with real, dangerous power.",
          "Jasira raised her hand. \"I can—\"",
          "\"Stay with the little ones, Jasira.\" Orlei didn't even look back. Not unkind. Just automatic, the way you'd say *watch your step* — a thing said so many times it stopped being a decision. \"Keep them calm, yeah?\"",
          "She'd heard some version of that sentence probably four hundred times in her life.",
          "\"Yeah,\" Jasira said, already smiling the smile that made it look easy. \"Course.\"",
          "Mochi, in her hood, made a small indignant noise on her behalf. She scratched under his chin. \"I know,\" she murmured. \"I know, buddy.\"",
          "She kept the little ones calm — genuinely calm, actually, better than the barrier team kept the ridge, if anyone had been counting, which nobody was — by doing the thing she always did: she read to them. An old favorite, dog-eared, half the pages soft from being turned so many times. Her voice did something to a room full of scared children that no war-Verse could, and none of them noticed the flowers blooming faintly along the windowsill in time with her sentences, and neither did she, not really, because she'd stopped noticing her own magic a long time ago too."
        ]
      },
      {
        id: 'ch1-sc3',
        chapterId: 'chapter-1',
        title: 'The Athenaeum',
        sceneIndex: 3,
        illustration: '/images/story/athenaeum.webp',
        illustrationAlt: 'The ancient book-hall of Duskbloom',
        atmosphereClass: 'bg-muted-plum text-pale-pink',
        content: [
          "It was only after — ridge secured, horn silenced, everyone celebrating Orlei's team like always — that Jasira slipped back to the one place that never made her feel like a spare part: the Athenaeum, Duskbloom's old book-hall, half library and half greenhouse, vines grown up through the shelves.",
          "That was where she found the first blank page.",
          "It was an old volume she loved — *The Wayfarer's Return*, the kind of book she'd read maybe thirty times, the ending so good it still got her every time. She opened it to the last chapter to visit her favorite line, the way she did when the day had been a particular kind of tiring.",
          "The line wasn't there.",
          "The whole final page was pale, blank, faintly warm to the touch, like something had been erased so gently it hadn't even torn the paper.",
          "Jasira sat with that book in her lap for a long moment, feeling something she recognized immediately, because she'd felt it about herself more times than she could count: *this mattered, and nobody's going to believe it mattered enough to matter.*",
          "She read the missing ending back into the book anyway — out loud, from memory, every word she'd loved so many times it lived in her like a second heartbeat. Her Verse rose without her calling it, lilac light spilling soft over the page, and the words came back. Faint. Fragile. But back.",
          "She stared at her own hands like they belonged to a stranger. She'd done this before — the roses, small things, little fixes nobody asked her to make — and never once stopped to wonder what it meant, because nobody around her had ever wondered either. It hadn't occurred to her that \"the pretty thing Jasira does\" and \"the only thing that just fixed what nothing else could\" might be the same thing."
        ]
      },
      {
        id: 'ch1-sc4',
        chapterId: 'chapter-1',
        title: 'The Grandmother\'s Journal',
        sceneIndex: 4,
        illustration: '/images/details/notebook.webp',
        illustrationAlt: 'The grandmother’s water-stained journal',
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "That night she pulled out the one thing she'd never quite known what to do with: her late grandmother's old journal, water-stained, left to her the winter before. She'd read it a dozen times for comfort and never once for answers. On the last page, underlined twice, was a line she'd always assumed was just sentimental:",
          "The wood will not be saved by the loudest power in it. It will be saved by the one who never stopped trying, long after trying stopped being noticed.",
          "Jasira read it again, slower this time, and for the first time wondered if it had been written about someone in particular. She still didn't think it was about her. She just kept it close anyway — the way she kept trying at everything, whether or not she believed it would matter.",
          "Nobody saw any of it happen. That was fine. She was used to that too.",
          "She reported the blank page to the Elder Circle the next morning anyway, quietly hopeful, the way you're hopeful about a thing you already suspect won't be taken seriously.",
          "\"Probably just old ink,\" said Elder Vashti, already turning back to the maps of the northern ridge. \"We'll look into it once the real threat's handled.\"",
          "Jasira nodded, said \"of course,\" and didn't argue.",
          "But that night, three more books in the Athenaeum went blank on their final pages. And this time, so did the last line of the story Jasira's little cousin had been telling at bedtime — the girl just stopped mid-sentence, blinking, genuinely unable to remember how her own made-up story was supposed to end, like the ending itself had simply stopped existing anywhere, even in her head."
        ]
      },
      {
        id: 'ch1-sc5',
        chapterId: 'chapter-1',
        title: 'The Last Page',
        sceneIndex: 5,
        illustration: '/images/story/blank-page.webp',
        illustrationAlt: 'The vast floating library of unwritten pages',
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "Ren found her in the Athenaeum at 2 in the morning, surrounded by every book she owned, all open to their final chapters, cross-referencing which lines had faded and which hadn't.",
          "He didn't ask if she was okay. He never did the performative version of caring. He just sat down across from her and started reading the same pages, matching her pace, and somewhere around the fourth book he said, quietly: \"This isn't old ink.\"",
          "\"No,\" Jasira said. \"It's not.\"",
          "They mapped it that week — every blank page, every half-remembered ending, every story losing its final shape — and the pattern pointed one direction: east, toward a place the old maps only called *The Last Page*, a rift at the edge of the wood where, legend said, every story that had ever been told went to rest once it was finished.",
          "Except it wasn't resting anymore. Something there was unwriting.",
          "Orlei's team tried first, because that was the order of things in Duskbloom — the strong Verses went first, always. A barrier-caster threw the widest, strongest wall she'd ever raised directly at the rift's edge.",
          "It didn't bounce off. It didn't shatter. It just — stopped mattering, the gold light fading to nothing the second it touched the rift, like the rift didn't recognize force as a language at all.",
          "\"It's not a monster,\" Jasira said slowly, watching it happen, something clicking into place that had never had a shape before. \"You can't fight an ending with a sword.\"",
          "Elder Vashti, for the first time in Jasira's whole life, turned and actually looked at her — really looked, not the polite half-glance reserved for the elf who \"kept the little ones calm.\"",
          "\"Then what can?\" Vashti asked.",
          "Jasira felt her Bloomverse warm at her hip, steady, certain, like it had been waiting its whole life for someone to finally ask it that question.",
          "\"Someone who speaks its language,\" she said.",
          "Nobody told her to stay back this time. That, more than anything, was how Jasira knew how bad it had actually gotten.",
          "The Last Page, up close, wasn't a wound in the world so much as an enormous, endless library with every shelf half-empty — millions of books hovering mid-air, every single one open to a final page gone soft and pale and blank, pages fluttering like something was still actively, desperately erasing them even as she watched.",
          "At the center of it all was a presence, not quite a person, made of every unfinished sentence in the wood — and it wasn't a villain in the way the Hush had been. It was something closer to grief wearing the shape of fear: a thing that had convinced itself that if a story never ended, it could never truly be lost either. So it was unwriting every ending it could reach, one gentle erasure at a time, trying to keep everything — everyone — alive forever by making sure nothing was ever finished.",
          "\"I understand you,\" Jasira said to it, and meant it completely, because some part of her — the part that flinched every time someone said *keep the little ones calm* and heard *you're not the one we actually need* — understood exactly what it felt like to believe that finishing something, being fully seen and fully done, was more dangerous than staying safely incomplete forever.",
          "The presence surged toward her, and every unfinished page in the Last Page surged with it, trying to pull her story into itself too, unwritten before she'd even had the chance to end it on her own terms.",
          "Ren moved to fight it. Jasira caught his wrist.",
          "\"Don't,\" she said. \"It doesn't understand force. It only understands stories. Let me.\"",
          "For the first time in her entire life, someone stepped back and let her go first."
        ]
      },
      {
        id: 'ch1-sc6',
        chapterId: 'chapter-1',
        title: 'The Unexpected Ending',
        sceneIndex: 6,
        illustration: '/images/story/restored-ending.webp',
        illustrationAlt: 'A single page drifting down — an ending written for Jasira',
        atmosphereClass: 'bg-lavender text-midnight',
        content: [
          "Jasira opened her Bloomverse, and for the first time she didn't write about herself at all.",
          "She wrote about endings — every good one she'd ever read, every terrible loss that a proper ending had somehow, impossibly, made bearable. She wrote that a story left forever unfinished doesn't stay alive. It just stops being a story at all — it becomes a fragment, uncertain, easy to forget, easy to lose completely, because nothing holds it in shape. An ending isn't the death of a story.",
          "An ending is the thing that makes a story permanent.",
          "The presence recoiled, shrinking, pages around them starting — slowly, terrified, resisting the whole way — to hold still instead of fluttering apart.",
          "And that was when the Last Page did something no threat in the story had done yet.",
          "It answered her back.",
          "Not in words exactly — in a page. One single page, drifting down out of the endless hovering shelves, landing gently in Jasira's open hands. It wasn't blank like the others. It was already written, in handwriting Jasira knew instantly, because she'd seen it scrawled in the margins of a hundred late-night messages, a hundred inside jokes, a hundred *goodnight*s over years of never once letting their story go quiet.",
          "It read:",
          "This whole world was written for you. Every page of it. Not because you needed to become powerful — you already were. Because somebody wanted you to see, for once, in a shape big enough to hold it, how much the quiet, \"not serious\" parts of you have always been the realest magic in the room. This story has an ending. That was never the scary part. The scary part was whether you'd believe you deserved one this good. You do. You always did.",
          "— written for Jasira Veyra, with everything",
          "Jasira read it twice, and this time she didn't fold the feeling small and put a joke on top of it. She let it hit her completely — the tears, the laugh that came right alongside them, both true at once, the exact thing she'd spent her whole life believing was \"too much\" turning out, at the very last page, to be the only thing strong enough to end this story right.",
          "The presence didn't vanish in a burst of light or a battle won. It simply — settled, page by page, folding gently back into finished stories all across the wood, every blank ending filling back in exactly the way its own story deserved, no two endings the same, because that was the whole point.",
          "Duskbloom's books went back to shelves that same night, spines glowing faintly lilac-gold for a week after, as if the wood itself wanted everyone to remember which power had actually saved it.",
          "Orlei found Jasira in the Athenaeum the next morning, and for the first time, didn't say *stay with the little ones.* She just sat down across from her, the way Ren always had, and said: \"Teach me how you read to them. I want to understand what I've been missing.\"",
          "Jasira smiled — a real one, the whole-hearted kind she used to fold small — and opened her favorite book to page one.",
          "\"Only if you promise,\" she said, \"to actually make it to the ending this time.\"",
          "But some stories, once truly finished, leave behind an echo. And two nights later, that echo would knock on Duskbloom's door in the shape of something no ending had ever quite accounted for."
        ]
      }
    ]
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'The Book With No Author',
    description: 'An unmarked book begins rewriting reality in real time.',
    isAvailable: true,
    scenes: [
      {
        id: 'ch2-sc1',
        chapterId: 'chapter-2',
        title: 'The Unmarked Book',
        sceneIndex: 1,
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "Duskbloom healed slowly, the way real things do — not all at once, but morning by morning, the grey retreating a little further from the treeline every time the sun came up. Elder Vashti kept her word. The Hushing Decree came down off the council-hall wall within the month, and for the first time in seven years, nobody in the wood flinched when they cried in public.",
          "Jasira should have felt finished. Stories were supposed to end, and hers had — a real ending, the kind she'd have underlined twice in any book. And yet.",
          "It started small enough that she almost didn't notice it, which, given everything, should have been her first clue.",
          "A new book appeared on the highest shelf of the Athenaeum on a morning nobody remembered restocking it. No title on the spine. No author's name on the cover. Just smooth, unmarked leather, the exact dusty rose color of the ribbon she wore in her hair, which she told herself was coincidence, because that was easier than the alternative.",
          "She almost left it alone. She'd learned, the hard way, what unmarked things in that library could mean.",
          "She opened it anyway. That was also just who she was.",
          "The first page described a girl noticing that the roses under her window had stopped smelling like anything.",
          "Jasira read the sentence twice, a cold thread pulling tight behind her ribs. It wasn't close to her story. It was her story — word for word, the exact morning she'd found the wilting roses, right down to the detail of Mochi's ears swiveling toward the window that she'd never once said out loud to anyone.",
          "She flipped forward, hands not quite steady now, and the pages kept going — the horn sounding twice, Orlei telling her to stay with the little ones, the blank page in *The Wayfarer's Return* — every private, unwitnessed moment of the last month, printed in patient, unhurried handwriting, like someone had been standing just behind her shoulder the entire time, taking notes.",
          "The very last page she dared open was blank. Not erased-blank, the way the Hush had left things. Waiting-blank. As if whatever was writing this book simply hadn't caught up to her yet.",
          "\"Mochi,\" she said quietly, and for once there wasn't a joke anywhere near her voice. \"Someone's writing us. Right now. As it happens.\"",
          "Mochi didn't puff up indignantly this time. He went very still, which was somehow worse.",
          "She brought it to Ren before the sun was fully up, because whatever this was, she had learned exactly one lesson from the Last Page, and it wasn't a lesson she planned on forgetting: *don't sit alone with a thing that's trying to write your ending for you.*",
          "Ren read the first page in silence, then the last blank one, and set the book down like it might still be listening.",
          "\"This isn't a story being told,\" he said slowly. \"This is a story being *taken.* Someone's copying your life into a book faster than you're living it. And a copy that fast and that close…\" He didn't finish the thought. He didn't have to.",
          "\"Eventually catches up,\" Jasira finished for him. \"And when it does—\"",
          "\"We don't know what happens when it does,\" Ren said. \"That's the problem.\"",
          "Jasira closed the unmarked cover, feeling, for the first time since the Last Page had folded itself gently back into a thousand finished endings, the particular chill of a story that refused to know it was over."
        ]
      },
      {
        id: 'ch2-sc2',
        chapterId: 'chapter-2',
        title: 'The Storyboard Keeper',
        sceneIndex: 2,
        atmosphereClass: 'bg-muted-plum text-pale-pink',
        content: [
          "There was one thing about Jasira that not even Ren knew, and she'd kept it that way on purpose for four years running.",
          "Duskbloom had an old tradition, older than the Hushing Decree, older maybe than the Elder Circle itself: a stretch of smooth bark-parchment nailed along the Athenaeum's back wall, called the Storyboard, where anyone could pin up a tale of their own making — no name required, just a small carved mark at the bottom so readers could follow a voice they liked without ever knowing whose it was. Most storyboard-tales were simple things. A funny mishap dressed up as an adventure. A little romance between two made-up merchants. Nothing anyone took too seriously.",
          "Except, for four years, one corner of that wall had belonged to a mark shaped like a single pressed lilac bloom, and the stories pinned beneath it were not simple things at all.",
          "They were the realest things Jasira had ever written — braver than anything she'd ever said out loud, full of girls who felt too much and were loved anyway, endings that arrived slow and earned instead of rushed and easy, villains who turned out to be lonely instead of wicked. She wrote them at two in the morning, pinned them up before dawn so no one would see her do it, and then spent the following days pretending not to notice which strangers stopped to read them.",
          "She was refilling the storyboard corner with a new page, candlelight low, when Orlei's voice behind her nearly made her drop the whole stack.",
          "\"Oh — sorry, didn't mean to startle you.\" Orlei glanced past her at the wall, and something in her captain's face softened in a way Jasira had genuinely never seen it do. \"That corner's actually my favorite. The Lilac Mark. I've been following those stories for two years. Whoever writes them —\" she shook her head, almost embarrassed by her own sincerity. \"I don't know. They write like someone who feels everything at full volume and just never lets anyone see it happen live. Makes you wonder what she's actually like, day to day.\"",
          "Jasira's throat went tight and warm at once. \"Maybe she's exactly like you'd expect,\" she managed. \"Just — quieter about it than the stories are.\"",
          "\"Bet she's not,\" Orlei said, already walking on, entirely unaware. \"Nobody who writes like that is quiet about anything. She's probably the loudest person in whatever room she's standing in, and everyone around her just hasn't noticed yet.\"",
          "Jasira stood alone at the wall for a long moment after Orlei had gone, one hand resting flat over the newest page, over her own small pressed-lilac mark, and let herself, just once, imagine what it might feel like to sign a story with her actual name.",
          "Not yet, she told herself. But not never, either.",
          "She had absolutely no idea yet how soon that particular hope would matter."
        ]
      },
      {
        id: 'ch2-sc3',
        chapterId: 'chapter-2',
        title: 'The Vanishing of Elder Vashti',
        sceneIndex: 3,
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "The council chamber was exactly as it always was at dawn — cold stone, low light, the long map table still scattered with pins from the last northern-ridge meeting — except for the one detail that made every elf in the doorway go silent at once.",
          "Elder Vashti's chair was empty.",
          "Not slept-in-and-left empty. Not stepped-out-for-a-moment empty. Empty in the specific, wrong way a room feels when something has been removed from it rather than simply having left — her shawl still over the chair back, her tea gone cold but untouched, and on the table in front of her seat, a single torn page, edges rough, like it had been ripped rather than turned.",
          "Jasira reached it first.",
          "The handwriting on it was Vashti's, unmistakably — except three words in, mid-sentence, the letters blurred and reformed into something that wasn't quite handwriting at all anymore, more like ink deciding it didn't want to be a word.",
          "I should have listened seven years soo—",
          "That was all of it. The sentence simply stopped being able to finish itself.",
          "\"She didn't run,\" Orlei said, arriving at a flat sprint, taking in the room with a captain's eye — no forced door, no sign of struggle, nothing knocked over. \"Nobody breaks in like this.\"",
          "\"Nobody breaks in without breaking anything,\" Jasira said slowly, turning the torn page over in her hands. \"This isn't an intruder. This is an edit.\"",
          "The three of them stood with that word for a moment, because they all understood, without needing to say it aloud, exactly what an *edit* to a person would mean, given everything they'd just survived.",
          "\"The Hush erased endings,\" Ren said. \"The book upstairs is copying beginnings, middles, everything, in real time. And now —\"",
          "\"Now something's erasing a person mid-sentence,\" Jasira said. \"Not her ending. Her *whole story,* starting from wherever she got interesting enough to be worth stealing.\"",
          "Orlei's jaw tightened. \"Then we find whoever's holding the pen.\"",
          "They searched Duskbloom for three days and found exactly nothing that made sense. No trail. No Verse-signature the trackers recognized. Every witness who'd seen Vashti in her final hour told a slightly different, slightly wrong version of the same evening, small details shifting depending on who told it — the color of her shawl, which door she'd left through, whether she'd smiled at anyone on her way in — as if the story of that night hadn't fully decided what had happened yet either.",
          "It was Jasira, on the third sleepless night, cross-referencing every altered witness account against the blank book upstairs, who noticed the detail that made her blood go cold.",
          "Every single inconsistency traced back, if you followed the threads far enough, to one place on the old maps.",
          "The exact center of where the eastern grove had burned, seven years ago.",
          "Where the original wildfire — the one the whole Hushing Decree had been built to prevent from ever happening again — had started, and, as far as anyone in Duskbloom had ever been told, ended.",
          "\"It never fully ended,\" Jasira said out loud, to no one, the pieces finally arranging themselves into a shape she didn't want to look at directly. \"Something's still burning there. And it's hungry.\"",
          "\"Then who?\" Orlei asked, exhausted in a way Jasira had never seen from her.",
          "\"Something that isn't trying to frame anyone,\" Jasira said slowly. \"Something that's just hungry enough not to care who takes the blame, as long as nobody looks at the real place long enough to notice it.\"",
          "They released Corvin the next morning, his reputation more damaged than his conscience, and Jasira turned her attention, at last, fully east — toward the one place on every map that every altered story kept almost, almost mentioning, before flinching away."
        ]
      },
      {
        id: 'ch2-sc4',
        chapterId: 'chapter-2',
        title: 'The Elder Who Remembered',
        sceneIndex: 4,
        atmosphereClass: 'bg-ink text-cream',
        content: [
          "It was Ren who found the journal, tucked behind a loose stone in Vashti's now-empty chambers, while Jasira searched for anything that might explain why the vanishing had chosen an elder first. Vashti's handwriting, unmistakable, filled its final pages — and unlike the torn page on the council table, these words hadn't been touched by whatever was erasing her. These were older. Written and sealed away seven years before any of this began.",
          "Jasira read them by candlelight, and understood, for the first time, that this had never been a story with a villain in it at all.",
          "I was there the night of the fire,* the journal read. *Not just the elder who wrote the Decree afterward. I was standing closest when it started. She wasn't a stranger to me. She was my apprentice. Bright. Overflowing. I told her, every single week, that she felt things too loudly for her own good — that a Verse like hers needed careful handling, restraint, control. I meant it kindly. I have told myself that for seven years, that I meant it kindly.",
          "The night before the fire, she came to me in tears about something small — a friend who'd moved away, nothing catastrophic — and I told her she needed to learn to feel things more quietly, for her own sake, before her feelings got the better of her. She never came to me again after that. Three days later, the grove burned, and I have spent every year since telling this entire wood to be quieter, smaller, safer — because some part of me has always believed that if I'd only perfected the lesson sooner, she might have stayed small enough to survive.",
          "The last line was written in a different, shakier hand, added — from the ink's age — sometime much more recently, perhaps only weeks before Vashti vanished:",
          "I don't think smallness ever saved anyone. I think I have simply been too afraid to say so out loud, in case saying it meant admitting what it actually cost.",
          "Jasira closed the journal gently, throat tight, and understood at last why the vanishing had reached for Vashti first, out of an entire wood full of easier, less complicated targets.",
          "\"She wasn't reaching for a random victim,\" she told Ren, voice steady even though nothing in her chest felt steady at all. \"She was reaching for the one person who taught her to be quiet — the one person who might finally understand why that lesson was the thing that broke her, not the thing that saved her.\"",
          "\"Do we tell Vashti we know?\" Ren asked.",
          "\"Not yet,\" Jasira said, tucking the journal carefully into her satchel, next to her own Bloomverse. \"We tell the girl first. She's the one who's been waiting seven years to hear it.\""
        ]
      }
    ]
  },
  {
    id: 'chapter-3',
    number: 3,
    title: 'The Price of Knowing',
    description: 'A bargain with the Binder sets Jasira on a new path to the eastern grove.',
    isAvailable: true,
    scenes: [
      {
        id: 'ch3-sc1',
        chapterId: 'chapter-3',
        title: 'The Contract',
        sceneIndex: 1,
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "With Corvin released, Vashti's journal read and reread, and the trail gone quiet everywhere else, there was only one place left that anyone knew of where a full answer might actually live — and Jasira had spent her whole life being warned, gently and specifically, never to go looking for it.",
          "There was exactly one being in Duskbloom old enough, strange enough, and feared enough to know what a seven-year-old fire that refused to finish burning could actually be.",
          "They called her **the Binder.**",
          "She lived past the last mapped tree, in a house that was mostly door — dozens of them, of every size and wood, set into a single round wall, none leading anywhere that made sense from the outside. The Binder dealt in Verse-contracts: bargains that traded a piece of what you were for a piece of what you needed to know, binding and exact and, by every account Jasira had ever heard, absolutely without mercy about the terms.",
          "\"You don't want to do this,\" Ren said, for the fourth time, as they stood in front of the door that had opened for no one else.",
          "\"I don't want Vashti erased mid-sentence either,\" Jasira said. \"Pick one.\"",
          "The Binder's front room smelled like old paper and colder still air. She was neither young nor old in any way that meant anything — tall, unhurried, eyes the flat grey of a page that had never been written on, and she looked at Jasira for a long moment before she spoke at all.",
          "\"A Bloomverse,\" the Binder said, almost fondly, like recognizing an old rival. \"It's been a long while since one of you walked in here believing you had nothing left to bargain with.\"",
          "\"I need to know what's in the eastern grove,\" Jasira said. \"The real answer. Not a guess.\"",
          "\"Everyone who asks me a true question pays a true price.\" The Binder produced a contract from nowhere in particular — parchment the same dusty rose as the mystery book, which Jasira noted with a chill and said nothing about. \"I'll show you exactly what's waiting for you out there. In exchange, you give me one full day of your voice. Not your Verse. Not your power. Just the ability to speak it, for one day, whenever I choose to collect.\"",
          "\"That's it?\"",
          "\"That's rarely *it,*\" the Binder said, not unkindly. \"For most people, silence for even one day is the steepest price I offer. You, of all the elves who've walked through that door, might actually understand why.\"",
          "Jasira thought of every \"keep the little ones calm,\" every joke stacked on top of a real feeling, every year she'd made herself smaller and quieter so the wood would find her easier to love. She thought of how much of her life she'd already spent choosing silence for free.",
          "\"Deal,\" she said, and signed before Ren could talk her out of it, ink flaring lilac-gold where her name met the page.",
          "The vision the Binder gave her didn't come gently.",
          "It came all at once — the eastern grove, seven years back, mid-fire, and at its center, not a monster, not a villain, but a girl. Younger than Jasira. A Bloomverse of her own, wild and untrained and utterly unsupported, grief pouring out of her in every direction because nobody had ever taught her that a heart that big needed somewhere safe to put itself down. The fire hadn't been an attack. It had been what happens when an enormous, unheld feeling finally runs out of places to hide.",
          "And the girl hadn't died in it. Jasira watched her — impossibly, horribly — get thinner instead, less finished, less *there,* fading not into ash but into something closer to an unwritten sentence, trapped in the space between what her story had been and whatever it might have become if anyone had simply stayed.",
          "\"She never ended,\" Jasira whispered, understanding hitting her like cold water. \"She's been stuck mid-sentence for seven years. And now she's trying to finish herself. By finishing other people first.\""
        ]
      },
      {
        id: 'ch3-sc2',
        chapterId: 'chapter-3',
        title: 'The Wasting',
        sceneIndex: 2,
        atmosphereClass: 'bg-ink text-cream',
        content: [
          "The Binder's price came due exactly as promised — one full, ordinary Tuesday where Jasira's voice simply would not come, no matter how hard she reached for it. She wrote everything on scraps of paper instead, and for the first time in her life, being unable to speak didn't feel like disappearing. It felt like being listened to differently — every written word actually read, all the way through, because for one day it was the only thing she had. Her voice returned with the following sunrise, right on schedule, and she used it, first thing, to say the truest sentence she'd worked out in the silence: *she's not the villain. She's me, if nobody had ever once let me finish a sentence out loud.*",
          "They found the second victim two mornings later, and this time it wasn't an elder tucked away behind a council door — it was Mochi, mid-morning, curled in Jasira's hood exactly as always, blinking up at her with an expression she had never once seen on his small round face in her entire life.",
          "Confusion.",
          "\"Mochi?\" she said — her voice had come back with the sunrise, right on schedule, the Binder's price paid in full — and he tilted his head at the sound of it like he was hearing something unfamiliar. Not unpleasant. Just unfamiliar. Like trying to place a name that used to be the easiest thing in the world.",
          "He nuzzled into her hand a second later, warm and himself again, and the moment passed so fast she could have told herself she'd imagined it.",
          "She hadn't.",
          "By that evening it had happened twice more, each time a little longer — Mochi forgetting, for three seconds, then five, then almost a full minute, who exactly this elf holding him was, before some deeper loyalty older than memory itself pulled him back to her anyway.",
          "\"It's spreading from her,\" Ren said grimly, once Jasira had forced herself to describe it out loud instead of writing it down and pretending distance made it smaller. \"Not blank pages this time. Blank *moments.* She's not just borrowing endings anymore. She's borrowing the memories that would have led up to them — trying to build herself a past out of pieces of everyone else's, because she never got to keep enough of her own.\"",
          "Jasira thought of the book about the girl with the fading mind that she'd stayed up three nights finishing, the one that had wrecked her so completely she'd needed an entire week before she could pick up anything else — the particular, specific horror of watching someone you loved get quietly erased from the inside, one small forgotten moment at a time, while still standing right in front of you, still warm, still trying so hard to hold on to the shape of who they used to be.",
          "She had cried for a fictional girl in a book for three nights.",
          "This was Mochi. This was real. And unlike the book, nobody had written this ending yet — which meant, for once in her life, she still had time to choose what it would be.",
          "\"We have to reach her before this spreads past Mochi,\" Jasira said, voice steady in a way that surprised even her. \"Before it's Ren. Before it's Orlei. Before it's someone I forget I even loved before I've had the chance to say so.\"",
          "\"And if reaching her means giving her what she wants?\" Orlei asked quietly. \"An ending built out of somebody else's story?\"",
          "\"Then we don't let her steal one,\" Jasira said. \"We give her a real one instead. Freely. That's the entire difference, and it's the only thing she's never once been offered.\""
        ]
      },
      {
        id: 'ch3-sc3',
        chapterId: 'chapter-3',
        title: 'The Long Way Round',
        sceneIndex: 3,
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "They didn't have long. Mochi's forgetting had started stretching past a minute now, and every hour spent standing still in Duskbloom felt like an hour handed straight to whatever was hungry in the eastern grove — but Jasira had learned, the hard way, that rushing toward a fight without knowing how to actually end it kindly was exactly how endings turned into erasures in the first place.",
          "Ren's people, the Stillwater clan, kept the oldest archive in the region — river-stones etched with memory-Verses going back further than Duskbloom's own written history, half-built into a quiet riverbank. \"If anyone's ever recorded what happens when a Bloomverse gets stuck mid-story instead of finished,\" Ren said, as they crossed two days of forest to reach it, \"it'll be here.\"",
          "The ancient, half-blind archivist who met them listened to the whole strange question with real delight. \"Seven years unfinished means something kept it alive,\" he said, running a weathered hand along the shelves until one stone hummed under his fingers. \"Belief. Someone has to keep believing a story is still possible for it to stay that stubborn. Most of the wood forgot that girl entirely. Someone didn't.\"",
          "Jasira went very still, an old memory surfacing — her grandmother, saying a name once a year, quiet and private, on the anniversary of a fire, a habit Jasira had never once thought to question.",
          "\"My grandmother,\" she said slowly. \"She kept the door open without ever telling anyone.\"",
          "\"Then it's fitting,\" the archivist said, sliding the humming stone into her hands, \"that her granddaughter is the one who gets to close it properly. This holds the only method my people ever recorded for finishing a Bloomverse without erasing the person underneath it. It is not quick. It is not painless. But it is the only kind of ending that doesn't require a villain.\"",
          "They left two days later with more than an answer — with the certainty, finally settled, that this had never been a story about defeating something. It had always been a story about finishing one."
        ]
      },
      {
        id: 'ch3-sc4',
        chapterId: 'chapter-3',
        title: 'The Sweet Before the Storm',
        sceneIndex: 4,
        atmosphereClass: 'bg-muted-plum text-pale-pink',
        content: [
          "They gave themselves one evening before the eastern grove, because even the bravest plans deserve a night that isn't spent being afraid, and because Jasira, of everyone in that wood, understood better than anyone that the soft, \"not serious\" moments were never actually the small ones.",
          "Orlei, of all people, was the one who suggested the candy-seller's stall at the edge of the square — the one that stayed open past dark for exactly this reason, for people who needed one uncomplicated sweetness before doing something hard.",
          "\"I used to come here as a kid,\" Orlei admitted, handing Jasira a paper twist of sugar-glazed petals, \"before I decided being strong meant not needing anything soft anymore. Watching you this past month made me rethink that.\"",
          "Jasira laughed — a real one, easy, nothing folded on top of it. \"High praise, Captain.\"",
          "Mochi, entirely himself again for the moment, demolished an entire sugar-petal in one triumphant bite and immediately demanded a second with the particular outrage of a creature who has never once doubted he deserved it.",
          "Ren didn't say much, the way he never did, but he sat close, shoulder against hers, steady as the ground itself, and at some point during the third round of sugar-petals he said, quietly, not quite looking at her: \"For what it's worth. I never once thought you weren't the one we needed. I just didn't know how to say it before you were the one saying it to everyone else first.\"",
          "Jasira didn't fold that feeling small either. She let it sit exactly as big as it actually was, right there in the middle of the square, candy-sticky fingers and all, and for one full evening, nobody needed saving from anything.",
          "Tomorrow could have the eastern grove. Tonight belonged to sugar-petals and the particular, ordinary magic of people who'd finally stopped hiding how much they meant to each other."
        ]
      }
    ]
  },
  {
    id: 'chapter-4',
    number: 4,
    title: 'The Girl Who Returned',
    description: 'The confrontation in the Eastern Grove.',
    isAvailable: true,
    scenes: [
      {
        id: 'ch4-sc1',
        chapterId: 'chapter-4',
        title: 'What the First Attempt Cost',
        sceneIndex: 1,
        atmosphereClass: 'bg-ink text-cream',
        content: [
          "They tried, at first, the way everyone in Duskbloom always tried first — with strength, arranged carefully, everyone's best intentions pointed at the grove like a wall waiting to be raised.",
          "Orlei's flame-Verse elves ringed the treeline at dawn, not to attack, they told themselves, only to *contain,* to keep whatever was in there from spreading any further while Jasira and Ren went in to talk. It seemed, in the pale early light, like a reasonable precaution.",
          "It was not.",
          "The moment the containment ring closed, the girl inside the grove felt it as exactly what it was — one more wall built to hold her in place, one more version of \"stay small, stay contained, stay safe for everyone else's comfort\" — and something in her that had been listening, softening, on the verge of finally being reachable, slammed shut instead.",
          "The grove convulsed. Ash lifted in a screaming spiral, and every faded, unfinished edge of the girl sharpened all at once into something closer to the raw grief that had started the original fire, seven years of careful waiting suddenly, violently, out of patience. Vashti, still weak in her bed back in Duskbloom, cried out and went limp, the torn sentence in her chest fraying dangerously close to its final threads. Two of Orlei's flame-Verse elves went down, not hurt exactly, just abruptly, terrifyingly *unremembered* by their own names for several long seconds.",
          "\"Pull back!\" Orlei shouted, horrified at what her own precaution had nearly caused. \"Everyone, pull back now!\"",
          "Jasira had already understood, faster and more completely than she wanted to.",
          "\"You can't corner an ending,\" she said, breathless, watching the ring of elves scatter clear of the grove. \"That's what we just did. We built a version of the exact wall that started this seven years ago, and we called it caution.\"",
          "\"Then what do we do?\" Ren asked, low, urgent, watching the grove still churning ash and grief in the near distance.",
          "Jasira looked back at the treeline — really looked, the way she'd learned to look at a blank page and see, underneath the emptiness, exactly what was actually missing.",
          "\"We go in alone,\" she said. \"No ring. No containment. Nothing that looks, even a little, like one more wall telling her to be smaller. If I'm wrong about this, it costs me. Not anyone else. Just me.\"",
          "Ren didn't argue this time either. He simply walked beside her to the treeline, stopped exactly where she asked him to, and let her go the rest of the way in by herself — the last, hardest, most necessary silence of the entire story."
        ]
      },
      {
        id: 'ch4-sc2',
        chapterId: 'chapter-4',
        title: 'The Girl in the Grove',
        sceneIndex: 2,
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "The eastern grove looked, at first glance, exactly as it had for seven years — blackened trunks, ash-pale ground, the one stubborn patch of lilac stubbornly blooming at its edge. It was only once Jasira stepped fully inside the treeline that the wood seemed to remember what it had been hiding, the air thickening, light bending strangely, the whole grove folding in on itself like a page about to turn.",
          "The girl was there, at the center, exactly as the flowers had remembered her — except faded now, edges soft and unfinished, like a sketch nobody had ever inked in fully. Elder Vashti stood beside her, equally faded, eyes distant, still mid-sentence in a story that hadn't been allowed to continue in three days.",
          "\"You shouldn't have come,\" the girl said, and her voice did the same thing the ink on Vashti's torn page had done — blurring at the edges when the feeling underneath it got too big to hold steady. \"I don't want to hurt anyone. I just want to finish.\"",
          "\"I know,\" Jasira said, and meant it so completely that the girl actually flinched, like she hadn't expected to be believed. \"I've spent my whole life being the elf nobody thought needed finishing either. I know exactly what seven years of that does to a person.\"",
          "\"Vashti wrote something, a long time before any of this,\" Jasira added, quieter now, pulling the sealed journal from her satchel and holding it up so the girl could see her own old teacher's handwriting. \"She never got to say it to you out loud. So I'm saying it for her. She was wrong. She has known she was wrong for years, and she was too afraid to say so until it was almost too late for both of you. She is sorry. Whatever happens next, she wanted you to hear that first.\"",
          "\"Then you understand why I have to take theirs,\" the girl said, gesturing at Vashti, faint and frozen beside her. \"Nobody ever gave me an ending. So I'm building one. Out of whatever's left.\"",
          "\"An ending built out of someone else's story isn't an ending,\" Jasira said. \"It's just a longer unfinished sentence. I know, because I almost let someone talk me into believing my own loudness was the dangerous part, instead of the silence that actually started every fire that's ever happened in this wood.\"",
          "The girl's faded form flickered, something underneath the fear and hunger listening properly for the first time in seven years.",
          "\"You don't need to take Vashti's ending,\" Jasira said, stepping closer, hand outstretched, Bloomverse warm and open at her hip. \"You never did. You needed someone to finally sit down and write yours *with* you. That's all any of this ever was.\"",
          "\"You don't even know my name,\" the girl whispered.",
          "\"Then tell me,\" Jasira said. \"Out loud. To someone who's actually staying to hear it.\"",
          "For the first time in seven years, the girl said her name — a small, ordinary thing, nothing like a villain's name should sound, and the entire grove seemed to exhale around it, ash lightening by a shade, the fire that had never quite finished burning finally, finally, catching its breath."
        ]
      },
      {
        id: 'ch4-sc3',
        chapterId: 'chapter-4',
        title: 'The Weight of an Unfinished Heart',
        sceneIndex: 3,
        atmosphereClass: 'bg-ink text-cream',
        content: [
          "It didn't stay calm.",
          "The moment the name left her, something underneath the girl — seven years of raw, cornered grief that had never once been allowed to simply exist out loud — reacted the only way it knew how: not with words, but with reflex. It lunged, sudden and starving, straight for the last full thread still holding Elder Vashti together, as if some older, more frightened part of her understood that a real ending meant this hunger finally had to stop being fed, and would rather take one last meal than let itself be finished.",
          "Vashti's faded form buckled, her half-finished sentence fraying visibly at its edges, seconds from unraveling completely.",
          "\"No—\" the girl gasped, horrified at her own hands, fighting whatever had just moved through her. \"I don't — I didn't mean to, I can't always—\"",
          "\"I know,\" Jasira said again, and this time she didn't stay at a careful distance to say it. She stepped fully into the space between the girl and Vashti, close enough that whatever happened next would happen to her too. \"You've spent seven years being *only* the hungry part, because nobody ever gave the rest of you anywhere safe to stand. That's not your fault. But I need you to hear me, right now, all the way past the hunger.\"",
          "\"You don't understand what it's like,\" the girl said, shaking, \"to be this empty for this long.\"",
          "\"I don't,\" Jasira admitted. \"But I know what it's like to spend a whole life being the quiet, easy, *not serious* one, and to be so hungry for someone to finally need me that I'd have taken almost any shape they asked for, just to stop being invisible. I never burned a grove down. I got lucky. I got a wood that eventually softened just barely in time. You didn't. That's the only difference between us, and it was never a fair one.\"",
          "The girl's flickering form went very still.",
          "\"So I'm not going to stand back and offer you words from somewhere safe,\" Jasira went on, voice steady even as her hands weren't, reaching for her own Bloomverse and letting it fall open, unguarded, every private page of it visible for the first time to someone other than herself. \"I'm going to give you something true of my own, right now, in trade — not because the Binder taught me that's how bargains work, but because you deserve to see that finishing honestly costs the person helping you something too. It was never supposed to be free.\"",
          "She read a page aloud, unpracticed and a little wrecked, one she'd never once shown anyone, not even Ren — the exact shape of every night she'd lain awake wondering if the whole wood would notice if she simply stopped trying to be useful, since nobody seemed to need her to be. It was small, next to seven years of fire. She let it stand anyway, unshrunk, because the size of a feeling was never supposed to be a competition.",
          "The girl listened to all of it, and for the first time since the grove had opened around them, the hunger in her didn't lunge again. It simply — waited, the way something exhausted finally allows itself to, once it understands it isn't the only overwhelmed thing in the room.",
          "\"Okay,\" the girl whispered, and her voice, for the first time, sounded less like an ending being forced and more like a person, tired and young and finally ready. \"Okay. Show me how it's supposed to go.\""
        ]
      },
      {
        id: 'ch4-sc4',
        chapterId: 'chapter-4',
        title: 'The Ending She Chooses',
        sceneIndex: 4,
        atmosphereClass: 'bg-midnight text-parchment',
        content: [
          "Jasira didn't fight her. There was nothing left to fight — only two Bloomverses in one scorched grove, one seven years overdue for a sentence to finish, one only just learning what her own full sentences sounded like out loud.",
          "They wrote it together, and it did not go smoothly, not even once the hunger had quieted.",
          "Jasira had imagined, without quite admitting it to herself, that the actual moment would look something like the vision the Binder had shown her — clean, certain, a single unbroken current of light. It didn't. It looked like two people trying to find the same sentence from opposite ends of it, getting it wrong, starting over. The girl's grief kept trying to write itself as an apology, over and over, the same three self-erasing lines, because an apology was the only shape of ending she'd ever practiced giving herself. Each time, the page it appeared on faded instead of holding, because an apology alone has never once been a whole ending for anyone.",
          "\"That's not it,\" Jasira said, gently, for the third time. \"You don't owe this grove a smaller version of yourself as payment. Try again. Tell it what actually happened to you, not just what you're sorry for.\"",
          "\"I don't know how to do that without it sounding like an excuse,\" the girl said, frustrated, ash stirring around her ankles.",
          "\"Then it'll sound like an excuse for one sentence,\" Jasira said. \"Keep going anyway. Endings are allowed to be clumsy on the way in.\"",
          "So the girl tried again, and this time the words came out wrong-shaped and honest instead of neat and apologetic — a girl who had loved too loudly in a wood that had taught her loud love was a hazard, who had grieved a small, ordinary loss and been told to grieve it more quietly, who had broken not because she was dangerous but because nothing in her whole life had ever been built to hold the size of what she felt. It wasn't a polished sentence. It was true, all the way through, for the first time in seven years, and this time the page didn't fade at all — it held, warm and steady, lilac light spilling from it in slow, unhurried petals instead of the frantic, hungry sparks from before.",
          "\"There,\" Jasira said, something in her chest loosening for the first time since she'd stepped into the grove. \"That's what an ending sounds like when nobody's rushing you out of it.\"",
          "\"I still don't know what happens to me after this,\" the girl admitted, voice small again, but steadier now, no longer bracing for the sentence to be taken from her mid-word.",
          "\"I don't either,\" Jasira said honestly. \"Nobody's ever written this particular ending before. But I know it isn't erasure, because I'm not leaving, and endings written by someone who stays don't look like disappearing. They look like this.\" She held up her own Bloomverse, its final page glowing the same steady lilac. \"Whatever's on the other side of this sentence, you're not walking into it invisible. Not this time.\"",
          "The girl almost smiled — the first thing on her face in seven years that wasn't fear or hunger. \"You know, for a long time, some small stupid part of me kept hoping someone would come back for the part of me that never got to finish. I stopped believing it would actually happen. It was a stubborn, pathetic sort of hope to keep carrying that long.\"",
          "\"It wasn't pathetic,\" Jasira said, and meant it with her whole chest. \"I've felt that exact hope. Mine just got to stay a little more hidden than yours did, because nobody ever needed my grief to be a wildfire before anyone noticed it. Yours had to burn down half a grove before this wood finally looked. That's not a difference in how much either of us deserved to be found. It's just a difference in how loud the world made us before it paid attention.\"",
          "Something in the girl's faded edges settled at that, gently, the way a held breath finally lets go.",
          "Together, they finished it — not a punishment, not the erasure she'd been offering everyone else because it was the only shape of ending she'd ever been shown, but a real one. The fire acknowledged. The grief given somewhere honest to go. Seven years of an unheld heart finally, gently, held. Jasira's Bloomverse and the girl's rose together, lilac and something rawer and older intertwining, rewriting not the past but what came after it, the way every good ending actually works — slow, imperfect in the drafting, true in the final line.",
          "Elder Vashti's sentence finished mid-word, color and weight flooding back into her all at once, gasping like surfacing from deep water. Mochi's small confused blinks stopped, that morning already fading into the kind of memory that gets to stay a memory instead of a wound.",
          "And the girl — faded, unfinished, seven years overdue — didn't vanish and didn't stay trapped either. She simply, finally, got to *end,* the way a story is supposed to: gently, completely, on her own terms, surrounded for the first time by someone who'd chosen to stay until the very last page. Where she went after that, nobody in Duskbloom could ever quite explain afterward. Only that the grove bloomed lilac for the first time in seven years the following spring, and that everyone who walked past it swore they felt, just briefly, entirely at peace.",
          "Duskbloom rebuilt itself properly after that — not back to what it had been before the Hush, but into something new, a wood that had finally learned, all the way down to its roots, that the loudest hearts and the softest ones were never actually different in kind, only in volume, and that both deserved somewhere safe to land.",
          "The unmarked book in the Athenaeum finished writing itself the same week. Jasira found it on its usual shelf, the final page no longer blank, no longer waiting.",
          "It read, in the same patient, unhurried handwriting as always:",
          "Some stories get written because someone is watching. This one got written because someone, somewhere, loved you enough to make sure you'd always have proof — in case you ever forgot again — that the quiet, \"not serious\" parts of you were never small. They were just waiting for a story big enough to hold them properly.",
          "This is that story. Every page of it. Still yours. Always was.",
          "Jasira closed the book gently, the way you close something you plan on reading again someday, and slid it onto her shelf, spine-out, right between her two other favorites."
        ]
      }
    ]
  },
  {
    id: 'chapter-5',
    number: 5,
    title: 'One Year Later',
    description: 'An epilogue where Jasira signs her own story.',
    isAvailable: true,
    scenes: [
      {
        id: 'ch5-sc1',
        chapterId: 'chapter-5',
        title: 'Bloom',
        sceneIndex: 1,
        atmosphereClass: 'bg-lavender text-midnight',
        content: [
          "The eastern grove bloomed lilac that spring, exactly as the flowers had somehow promised it would, and Duskbloom held a small, unofficial festival there to mark it — not to celebrate a battle won, because nobody who'd actually been there thought of it that way, but simply to sit together in a place that had finally, gently, finished healing.",
          "Jasira came with a satchel of paper twists of sugar-glazed petals, Mochi riding contentedly in her hood, entirely and permanently himself again, and found Orlei already there, sitting cross-legged in the new grass with a familiar, worn bark-parchment page in her lap.",
          "\"New Lilac Mark story went up this morning,\" Orlei said, not looking up, utterly absorbed. \"Best one yet, if you ask me. Girl finally tells the truth about who she really is, out loud, to someone who's been in front of her the whole time.\" She glanced up, grinning. \"You should read it. I have a feeling it's exactly your kind of thing.\"",
          "Jasira sat down beside her, heart going soft and loud at once, and reached into her satchel for one more page — the same handwriting, the same small pressed-lilac mark, except this time, for the first time in four years, she'd signed her actual name underneath it.",
          "\"Funny you should say that,\" she said, handing it over.",
          "Orlei read the name at the bottom, went very still, then looked up at Jasira with an expression somewhere between delight and total, joyful betrayal.",
          "\"*You.* This whole time. Four years, and you let me talk about the Lilac Author like some mysterious stranger, right to your actual face.\"",
          "\"You said she was probably the loudest person in whatever room she was standing in,\" Jasira said, laughing properly, the whole-hearted kind. \"You just hadn't noticed yet.\"",
          "Ren arrived a few minutes later, unhurried as always, and sat close without needing an invitation, the way he always did now. Mochi demanded — and received — his third sugar-petal of the morning. And Duskbloom bloomed around all of them, brighter than it had any right to be after everything it had survived, every flower open at once even though the moon wasn't due for hours yet, as if the wood itself had simply decided it no longer wanted to wait for permission to be that loud, that alive, that entirely unafraid of being seen.",
          "Jasira Veyra, once the elf nobody thought needed finishing, sat in the middle of it all with her found family, her name finally signed to her own stories, her ending long since chosen and never once regretted.",
          "Some hearts, it turned out, had simply been waiting their whole lives for a wood soft enough to hold their volume.",
          "Hers finally had one.",
          "Because some hearts were never meant to whisper.*",
          "*Some hearts were made to bloom out loud — and now, finally, so was everyone else's.",
          "— THE END —"
        ]
      }
    ]
  }
];
