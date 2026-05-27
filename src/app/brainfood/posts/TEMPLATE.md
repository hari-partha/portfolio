# Editorial Post Template

Use this for every new post page:

1. Create `src/app/brainfood/posts/<slug>/page.tsx` for **Brainfood** posts, or `src/app/soulfood/posts/<slug>/page.tsx` for **Soulfood** posts.
2. Add the post to `src/data/brainfoodPosts.ts` with the matching `brand` and `href` (`/brainfood/posts/...` or `/soulfood/posts/...`).
3. Import:
   - `EditorialTemplate`
   - `EditorialSection`
   - `EditorialCaseStudy` (optional)
4. Fill `EditorialTemplate` props using your post metadata (`brand="brainfood"` or `brand="soulfood"`).
5. Compose sections with:
   - intro section (`editorial-intro-section`)
   - 2-6 `EditorialSection` blocks
   - optional pull quote: `editorial-pull-quote`
   - optional question list: `editorial-questions`
   - optional case studies

Example starter:

```tsx
import { EditorialSection, EditorialTemplate } from '@/components/blog/EditorialTemplate';

export default function NewPostPage() {
  return (
    <EditorialTemplate
      brand="brainfood"
      coverLabel="Brainfood · Bitsize"
      title={<>Your Post Title</>}
      subtitle="One-line description."
      authorName="Hari Parthasarathy"
      authorMeta="Bio x AI x Systems"
      introKicker="Context"
      introBandText="Set up the reader in one sentence."
      footer="Optional footer note"
    >
      <section className="editorial-intro-section">
        <p className="editorial-intro-lead">Lead paragraph in editorial voice.</p>
        <p className="editorial-p">Body paragraph.</p>
      </section>

      <EditorialSection title="Section title" subtitle="Section subtitle">
        <p className="editorial-p">Your content.</p>
      </EditorialSection>
    </EditorialTemplate>
  );
}
```
