import { BitsizeReaderLayout } from '@/components/blog/reader/BitsizeReaderLayout';
import { ReaderParagraph, ReaderSourceNote } from '@/components/blog/reader/ReaderBlocks';

const SUBSTACK_URL = 'https://hariparthasarathy.substack.com/p/brainfood-chapter-1-venturing-into';

const BODY_PARAGRAPHS = [
  'This summer, my frequent BART rides up to Berkeley left me with ample free time, and I found myself reconnecting with an old habit -- reading fiction. Thanks to a conversation with a colleague at Bakar Labs (shoutout to Josh Holter!), I picked up Isaac Asimov’s famous “Robot” series. While many recommend starting with “I, Robot” (partly made famous by Will Smith), I instead found myself diving into “The Caves of Steel,” the true origin of Asimov’s exploration into human-machine relationships.',
  '“The Caves of Steel” immerses us in a future Earth dominated by vast, enclosed megacities -- the titular caves of steel -- where detective Elijah Baley partners with R. Daneel Olivaw, an advanced humanoid robot, to solve a gripping murder. It struck me immediately how closely communal personal spaces in the novel mirror UC Berkeley housing layouts -- shared dining halls with fixed meal plans, communal bathroom stalls and laundry rooms, and underground libraries. Bailey’s seemed like an extension of a college campus, bustling with activity, familiarity, and a comforting sense of shelter. More compelling, however, was how Asimov perfectly captures our modern perspectives toward AI. Just as how Baley’s initial skepticism of R. Daneel transitions slowly into acceptance and reliance, the initial perceptions about ChatGPT and Bard (the precursor to Gemini), especially around their hallucinations, that made us constantly fact-check, doubt the reasoning, and continue to question has been replaced by vibe-coding with Grok, writing emails with GPT on the regular, and AI agents working (almost indistinguishably from their human counterparts) to seek and synthesize knowledge. To echo Asimov, two years ago was the age of R. Sammy; today’s world marks the introduction of R. Daneel!',
  'But to me, it is Asimov’s famous Three Laws of Robotics that stand out. Not merely because these laws echo our contemporary ethical frameworks for AI, but more so due to the remarkable “biology” inherent in their logic. It’s easy to forget that Asimov was not a physicist, technologist, or engineer, but rather a humble biochemist. This foundational understanding of biology is precisely what makes his robots uniquely compelling, compared to those of his predecessors or his aspiring successors. Rather than mere mechanical creations, Asimov’s robots feel like sophisticated thought experiments, rooted in a deep understanding of psychology and neuroscience, explicitly designed to probe human nature itself. They are mirrors reflecting our reasoning, emotions, and our intricate pathways for determining self-worth and validating our actions.',
  'There is a clear element of psychology and an intentional commentary on human logic embedded in the fabric of Asimov’s robotic universe. Consider the positronic brain, running not on neurons, synapses, and action potentials but on “positrons” and artificial neural networks. Despite its sophistication, it cannot fundamentally create spontaneous curiosity. R. Daneel himself acknowledges his curiosity as a programmed imitation rather than genuine intrigue -- a stark contrast to human curiosity, rooted deeply in our biological capacity to form new synapses, neuronal pathways, and tie these new experiences to deep chemical responses (i.e., dopamine for happiness, adrenaline for fear, or cortisol for calmness). This fundamental neurological difference subtly underscores our human uniqueness.',
  'The theme deepens further with emotion. Asimov’s robots display emotional cues only as contextually appropriate responses -- they don’t truly feel. A robot can smile, yet the smile holds no authentic emotional foundation (a common recurring theme of R.Sammy’s characterization, and one of the main personality traits of Earth-made robots that irks Baley). Robots act literally, with unwavering rationality and moral consistency. Conversely, humans in “The Caves of Steel” -- especially Baley and his family -- experience frustration, anger, apprehension, pleasure, envy, sorrow, grief, horror, and ultimately peace. Baley’s emotional journey, marked by internal conflict and nuanced reactions, vividly contrasts his humanity against his robot partner’s mechanical composure. It is precisely this emotional chemistry -- the internal biochemical “dance” of neurotransmitters and hormones -- that defines the essence of humanity within Asimov’s carefully structured robotic universe.',
  'Ultimately, Asimov’s profound insight is that humanity’s true strength isn’t just in our intelligence or capacity for logic (qualities we can increasingly replicate digitally) but rather in our nuanced biology, our complex psychology, and our innate emotional depth. Perhaps the man at Sproul isn’t entirely misguided in fearing AI, but he misses Asimov’s deeper revelation: the more we create machines in our image, the more clearly we understand what makes us uniquely human. In reading “The Caves of Steel,” I realized that the significance of Asimov’s biological lens is not as a mere backdrop for storytelling, but as the heart of his philosophical exploration. Robots in Asimov’s world aren’t threats, just as AI models in our world aren’t threats either. They are unprecedented opportunities to explore ourselves, our neurology, our logic, and our emotional complexity. And perhaps, as we embrace our creations, we’ll begin to better grasp our own humanity, and let it flourish!',
];

export default function CavesOfSteelPostPage() {
  return (
    <BitsizeReaderLayout
      brand="brainfood"
      seriesLabel="Brainfood · Bitsize"
      title={
        <>
          Venturing into the <span style={{ color: 'var(--reader-accent)' }}>Caves of Steel</span>
        </>
      }
      subtitle="What Asimov’s robots can still teach us about AI, biology, and the essence of being human."
      authorName="Hari Parthasarathy"
      authorMeta="Nov 11, 2025"
      readingTime="6 min read"
      introText="Walking past Sproul Hall on my way to class, I’ve become used to being handed information. Clubs tabling. Hotdog stands. Girl Scouts with Thin Mints. And the middle-aged man warning of an impending apocalypse -- “AI is humanity’s doom.” Isaac Asimov viewed that same inevitability through a far more optimistic lens."
      footer="Hari Parthasarathy · MET '26, UC Berkeley"
    >
      <ReaderParagraph dropCap>
        Walking past Sproul Hall on my way to class, I&apos;ve become used to being handed information. Clubs tabling and
        handing out flyers and trinkets during the first month of the semester. Hotdog stands and fruit vendors offering
        their homemade juices and traditional snacks. Girl Scouts, their tables stacked high with Thin Mints and Samoas.
        And the middle-aged man, camped near the front, passionately warning of an impending apocalypse without end --
        &quot;AI is humanity&apos;s doom: we are playing God, pitting man against machine, and to this end, we WILL
        fail&quot;. I&apos;m struck by the starkness of his fear, but in my eyes, it often feels like a futile reaction
        against the inevitable tide of scientific progress. Isaac Asimov, on the other hand, viewed this same
        inevitability through a far more optimistic lens -- one that sees AI not as humanity&apos;s downfall, but rather as
        a tool to further humanity&apos;s progress.
      </ReaderParagraph>

      {BODY_PARAGRAPHS.map((paragraph) => (
        <ReaderParagraph key={paragraph.slice(0, 48)}>{paragraph}</ReaderParagraph>
      ))}

      <p className="reader-signoff">A Food For Thought, — Hari</p>

      <ReaderSourceNote>
        First published on{' '}
        <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
          Substack
        </a>{' '}
        · hariparthasarathy.substack.com
      </ReaderSourceNote>
    </BitsizeReaderLayout>
  );
}
