/**
 * Admissions essay — a set of short insights, one `Insight` object each.
 * Render order follows this array (publish order can differ from numbering in titles).
 */
export type Insight = {
  /** Shown as H3, e.g. "1. K(NO)W — Know how to say No" */
  heading: string;
  /** Short italic lead under the heading */
  abridged: string;
  /** One string per paragraph */
  paragraphs: string[];
};

export const admissionsIntroParagraphs: string[] = [
  'April is Admissions Season! Hundreds of wide-eyed seniors are exploring lecture halls, meeting prospective classmates, and trying to picture themselves on these campuses for the next four years, all while grappling with a decision that can genuinely alter the course of their lives.',
  'Over these past four years at Cal, I’ve had the privilege of being on both sides of that decision, and as I now look toward graduation, I can’t help but think of all the things I wish someone had told me.',
  'So I’ve written them down as short LinkedIn-style insights. For admitted students. For the parents trying to help. For the siblings and friends who shape this decision more than they realize. Here they are.',
];

export const admissionsRollingNote =
  'A handful of insights, drawn from four years of hindsight. Take what’s useful.';

export const admissionsInsights: Insight[] = [
  {
    heading: '1. K(NO)W — Know how to say No',
    abridged:
      'Doing the most might be what gets you into college. Doing what’s worth your time is what gets you through college. It is important to figure out what you are chasing (what you want), identify your boundaries, and give yourself permission (and forgiveness) to walk away from an opportunity or tradeoff. The defining criteria: Say yes with intention. Say no with conviction.',
    paragraphs: [
      'The first real decision you’ll face in college isn’t picking a major, choosing your classes, or finding the right roommate — it’s learning to say no.',
      'I know. That sounds backwards. You just spent the last year fighting to get in. Every club, every research lab, every opportunity feels like something you earned the right to chase, an opportunity to engage your innate curiosity. And honestly? That energy is powerful!',
      'But here\'s what nobody warned me about.',
      'Freshman year, I said yes to everything. If a club was tabling on Sproul, I was coffee-chatting. If there was an event, I was first to sign up. If someone invited me somewhere, I was there. I wore it like a badge — being busy meant I was doing college right. Right?',
      'For a while, it looked like I was. But behind the scenes? My days started bleeding into each other. Sprinting from class to class. Coffee wasn\'t a habit; it was infrastructure. Sleep became whatever I could squeeze between midnight and my alarm. I told myself this was just what it took — curiosity had a cost, and I was paying it.',
      'Except I wasn\'t being curious anymore. I was just keeping up. There\'s a difference between exploring and overextending, and it\'s hard to see the line until you\'ve crossed it. By the time I realized I was spread too thin, I was already too deep into commitments to easily walk away.',
      'So, here\'s the single piece of advice I believe is critical to a strong college journey (as someone who learned this the hard way): Say yes with intention. Say no with conviction. Doing the most might have been what got you to college, but to really excel, you have to figure out what’s worth your time — and protect it. Be early in defining your boundaries. And when something doesn’t fit this mold, give yourself permission, forgiveness, and the humility to walk away or make the tradeoff. That’s not quitting. That’s maturing.',
    ],
  },
  {
    heading: '2. The Duality of Acceptance',
    abridged:
      'It\'s okay to feel a quiet pang of guilt, or even regret, about the choice you make. That doesn\'t mean you made the wrong one. It means the decision actually mattered to you. The defining criteria: Visit the colleges. Go to Admit Day. And, when all is said and done, make peace with your decision!',
    paragraphs: [
      'True story: Berkeley wasn\'t even in my top 3.',
      'Despite growing up in the Bay and visiting campus a handful of times, I had always aspired to follow in my father\'s footsteps — to a degree, but not his degree :P. Rice was the dream — had been for years. So when I got into Berkeley\'s M.E.T. program and Johns Hopkins\'s Bioengineering program, I started wavering. One was known for its entrepreneurial energy. The other is for producing some of the greatest clinical biologists. Rice felt like a nostalgic nod to my past. All three felt like they fit a version of who I wanted to become.',
      'I had visited Rice and Hopkins during my application season, so I didn\'t think I needed to go back for their admit weekends. That, and they overlapped with AP exams. But I did go to M.E.T. Admit Day.',
      'And honestly? That one visit changed everything.',
      'Having meaningful philosophical debates with peers seated around a table in the M.E.T. space. Going on scavenger hunts to find hidden gems about Berkeley’s history. Taking a mock class with M.E.T.’s acclaimed faculty director. There\'s something about being in the room with the people who could become your classmates, your collaborators, your late-night study partners for the next four years. It made the hypothetical real in a way no ranking or brochure ever could. I walked out of that day, and the decision felt less like a tradeoff and more like a fit. And while I still used a detailed spreadsheet to ultimately narrow my decision, there was something uniquely human about interacting with others in a physical setting that ultimately served as the tie breaker.',
      'Four years later, choosing Berkeley has been fulfilling, gratifying, and humbling. But I\'d be lying if I said I never pondered my other choices. What if I\'d gone to Owl Day? What if I\'d visited Hopkins one more time? Was being an entrepreneur the right path for me in a way that being a neuroengineer or clinical bioinformaticist never was? Those thoughts still float through even as I gear up to graduate.',
      'But here\'s the thing: that\'s normal. Wondering doesn\'t mean you chose wrong. It means you had real options, and you cared enough about each of them for the decision to leave a lasting mark. The guilt fades. What replaces it is something quieter — acceptance. Not the admissions kind that you first feel. The kind where you stop looking back and start trusting the path you\'re on.',
      'So if you\'re sitting with multiple acceptances right now, weighing pros and cons, feeling torn — go to Admit Day. Every single one you can. Don\'t assume you already know what a school feels like from a campus tour or an info session. Go when classes are in session, when you can sit in with your peers. Go when the cherry blossoms are in full bloom, when you can see the caps and gowns all around campus. Go when club recruiting is in full force, when everyone is rooting for you. Those rooms will tell you something that no spreadsheet ever can.',
    ],
  },
  {
    heading: '3. T = Trust Me',
    abridged:
      'Build deep! Explore wide! The students who stand out aren\'t the ones who know a little bit about everything — they\'re the ones with real depth in something, and enough range to connect it to everything else. Be a comb: t-shaped, with breadth and depth across multiple verticals.',
    paragraphs: [
      'My first day at Berkeley was met with a speech from one of M.E.T.’s faculty members. Talking about the values and perspectives he felt were important to internalize during college, he said something that caught me by surprise:',
      'Be a Comb.',
      'At the time, I had no idea what that meant. But he introduced the following analogy to help: suppose you are in charge of making hiring decisions for a band. In front of you are four artists — the world’s leading guitarist, the world’s leading bassist, the world’s leading drummer, and someone who can play all three adequately. You’d choose the three who are the world’s leading experts. Sure, the one-man band may play all three adequately and can certainly make a great manager someday, but in the short run, he is far underskilled compared to the other three in their domains. You trade generalist thinking for specialized talent every time.',
      'That’s the idea behind being T-shaped, or better yet, comb-shaped. Build deep expertise in specific verticals, which also gives you a real niche. But give yourself room to explore laterally, and build depth in other domains, so your depth isn’t siloed.',
      'I didn\'t fully understand this until I looked back at my own path.',
      'My vertical was always biotech. That was the throughline. But within that, I explored more laterally than I ever expected. Space biology at NASA. Early-stage startups working on everything from rare kidney disease to Dravet Syndrome to AAV-based gene therapies. Venture capital, where I got to see how the industry decides what scientific frontiers are worth betting on.',
      'Each of these was a different world. Different language, different pace, different problems. But the thing that connected all of them — the tooth on the comb that ran deepest — was computational thinking. ML pipelines, bioinformatics, data engineering, systems/networks. That was the skill I kept coming back to, regardless of the domain. It\'s what made me useful in the wet lab and at a VC meeting in the same semester.',
      'And that\'s the thing about the comb. The lateral exploration isn\'t just about breadth for breadth\'s sake. It\'s about pressure-testing your depth in new environments, figuring out where your core skills translate and where they break. That combination — domain expertise plus generalist curiosity — is what keeps you agile in a world that shifts at exponential scale.',
      'So if you\'re early in college and not sure whether to go deep or go wide: do both. But be cognizant of the difference between technical depth and wide-ranging breadth.',
    ],
  },
  {
    heading: '4. We The People',
    abridged:
      'Influence isn\'t built by collecting the most contacts — it\'s built by investing in the right people, deeply and genuinely, until connection and trust compound into something that feels like community. College is the most fertile ground you\'ll ever have for this — the people around you right now are not who they\'re going to become. Invest accordingly.',
    paragraphs: [
      'Coming into college, I recall reading this among the pages of You’re Invited. Beyond highlighting the notion of social networks and expanding connections, author Jon Levy introduces an equation that, in my opinion, has been a driving factor in how I’ve built my network over the past four years: Influence = (Connection × Trust) raised to the power of Sense of Community. Connection and trust are multipliers. Coffee chats and connections would grow your influence linearly at best. Community is the exponent—whether people feel at home around you, are invested in each other’s outcomes, root for each other, and grow together. That’s the variable that changes everything.',
      'Each of these three variables mapped to real experiences during my college journey.',
      'Connection: When I first began exploring venture capital, I had no connections in the space. Just me and my roommate, without a single contact to partners, analysts, or even a founder who was just starting out. So we did what felt natural—we reached out to two people within our program whom we knew well, hoping they could guide us in the right direction. Not through cold emails or LinkedIn templates, but through calls that felt personal, honest, and grounded. One was a founder who shared perspectives on how to build towards our vision and understand founder-level problems. The other is a senior who built his own fund platform. Impressed by our hustle and our “implicit confidence” (more on that in “Dripping in Finesse” below), he even offered us an opportunity to work with him, serving as a mentor and catalyst for our real-world explorations of VC theory. These two conversations also led to more conversations, which led to more introductions, more conversations, and a virtuous cycle of organic network growth. A few months later, my roommate and I had both built networks we couldn’t have achieved solely through cold emails and blank requests. That’s the nature of connection — it doesn’t scale by broadcasting. It scales by going deep on a few and letting introductions flow from there.',
      'Trust: Freshman year. I met Fernando Mendoza on my first day of classes. He was a Cal Football player — third-string quarterback, which, if you know anything about college football depth charts, means he was at least two degrees away from seeing the spotlight. We both bonded on the idea of follower-centric leadership and of building our business skills, and over time, as project partners across different classes, we built a level of mutual trust that carried over into our professional journeys as well. Now, even as the projected number one overall pick in the 2026 NFL Draft, he still takes a few minutes out of his day to respond to my text messages, despite his busy schedule and his multiple obligations.',
      'I tell this story not to name-drop, but to illustrate something that took me a while to understand: we cannot fully predict who the people around us will become. Instead, we should look to invest in people, to build trust and credibility among them without setting expectations on the relationship, and naturally, you’ll be left with a rolodex filled with meaningful, pingable contacts of high-achieving individuals.',
      'Sense of Community: Coming into M.E.T., I was fortunate to have a community that really helped amplify my influence and helped me learn from others. There were peers who were national chess champions and drone experts. Folks who had built multi-million dollar enterprises in high school, and folks who were owning billion-dollar AUM funds. Being able to learn from these individuals, while contributing my own background as a biotechnologist, allowed me to compound influence and create an opportunity for increased motivation and increased influence over time.',
    ],
  },
  {
    heading: '5. Dripping in Finesse',
    abridged:
      'Confidence isn’t the absence of inexperience — it’s the willingness to show up anyway, and to have done enough homework that showing up means something. First impressions are built on energy and personality, but it\'s your credibility that keeps you in the room. Walk in like you belong. Know your stuff well enough that you do.',
    paragraphs: [
      'My first week at Berkeley, I walked into Blackwell Hall and started playing pool.',
      'Sounds innocuous, except for one thing: I wasn’t a resident there. Blackwell was a residential hall with its own game area, and the equipment was for residents only. I had no idea. I had just walked in, picked up a cue from the front desk staff, and started playing like I was meant to be there.',
      'Eventually, a few weeks later, someone pointed out that I wasn’t a Blackwell resident. But by that point, I’d spent the better part of a few mornings interfacing with the front desk staff — asking them about their days, learning more about their experiences at Berkeley, just being genuinely curious and present. So when it came out that I wasn’t a resident? It mattered less than it should have. They trusted me before they had any reason to, and even though protocol existed, it didn’t change the way they viewed me afterward. That’s the thing about confidence: it opens doors before the credentials arrive.',
      'But here’s the part I don’t want you to miss.',
      'The reason I could be a bit more relaxed and confident wasn’t purely swagger. It was the fact that I had actually read the Blackwell student handbook — wanting to run a few events for M.E.T. in the shared common area at Blackwell — that prompted me to skim all the Blackwell policies, ensuring that I understood and adhered to them. When I played pool, I always ensured I followed Blackwell’s inherent policies and that my friends were a call away in case the front desk staff needed additional verification. The confidence was real because the groundwork was real.',
      'Now, this example is quite benign, but the same principles showed up elsewhere as well. When I started sitting in on VC conversations and scouting calls, I was almost always the youngest person in the room. I couldn’t walk in pretending I had a track record I didn’t have. Books are helpful for understanding theory, but I could never replicate the lived experiences of GPs or LPs. But I could come to understand the Berkeley landscape and the Bay Area startup pool. Having understood what companies are higher value and how to mitigate risk for LPs and GPs, I worked with different firms to put theory into practice and introduce them to talent, founders, and potential dealflow. When I spoke again, this time I wasn’t just exuding confidence; I was backing it up with operational experience.',
      'Technical work also had the same framework philosophy. New codebase? New tech stack? I learned on the fly — fast — because I’d started building an underlying habit of researching before I committed. This initial depth catalyzed a stronger foundation. The confidence increased access. Neither worked without the other.',
      'This is what I mean by finesse. It’s not about faking confidence or creating facades. It’s about walking into a room with enough genuine preparation that your energy isn’t bravado. It is earned.',
      'You are going to enter a lot of different rooms during your four years, where you feel like you don’t fully belong. That’s normal. That’s good actually — it means you’re in rooms worth being in. Read the handbook. Learn the vocabulary. Carry yourself like you’ve already been thinking about this for years.',
      'Because if you’ve done the work, you already have been.',
    ],
  },
];
