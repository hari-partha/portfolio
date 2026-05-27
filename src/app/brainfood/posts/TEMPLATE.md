# Brainfood Editorial Post Template

Use this for every new post page:

1. Create `src/app/brainfood/posts/<slug>/page.tsx`
2. Import:
   - `EditorialTemplate`
   - `EditorialSection`
   - `EditorialCaseStudy` (optional)
3. Fill `EditorialTemplate` props using your post metadata.
4. Compose sections with:
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
      coverLabel="Brainfood · Month Year"
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
