import { useScrollReveal } from '../hooks/useScrollReveal'
import { NOTES } from '../data/perfumes'

interface NoteItemProps {
  glyph: string
  ar: string
  en: string
  desc: string
  idx: number
}

function NoteItem({ glyph, ar, en, desc, idx }: NoteItemProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] bg-charcoal p-6 md:p-8 text-center hover:bg-charcoal-2 hover:duration-300"
      style={{ transitionDelay: `${idx * 80}ms` }}
    >
      <div className="font-ar-display font-bold text-5xl text-gold leading-none transition-transform duration-500 hover:translate-y-[-4px] hover:scale-106">
        {glyph}
      </div>

      <h3 className="font-ar-display font-bold text-2xl text-ivory mt-6">{ar}</h3>

      <div className="font-body text-xs md:text-sm tracking-widest uppercase text-gold mt-2">
        {en}
      </div>

      <p className="font-ar-body text-xs md:text-sm leading-relaxed text-grey-3 mt-4">{desc}</p>
    </div>
  )
}

export function Notes() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section bg-charcoal text-cream relative" id="notes">
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_-20%,rgba(182,138,53,0.16),transparent_60%)] pointer-events-none"></div>

      <div className="wrap relative">
        <div
          ref={headerRef}
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] text-center max-w-2xl mx-auto mb-12 md:mb-20"
        >
          <span className="eyebrow justify-center">قلب العطر</span>
          <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl text-ivory mt-4 leading-tight">
            أربع نوتات، أربع شخصيات
          </h2>
          <p className="font-ar-body text-base md:text-lg text-grey-3 leading-loose mt-6">
            نبني تركيبات ناسامات حول أربعة ملامح عربية أساسية، كل واحد منها واضح، متوازن،
            ومصاغ ليبقى أثره نظيفًا ومترتبًا على البشرة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal-3 border border-charcoal-3 rounded-lg overflow-hidden">
          {NOTES.map((note, idx) => (
            <NoteItem key={idx} {...note} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
