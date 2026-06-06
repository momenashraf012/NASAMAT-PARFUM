import { useMemo, useState } from 'react'
import { ArrowLeft, Gift, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PERFUMES } from '../data/perfumes'

type MoodKey = 'calm' | 'evening' | 'formal' | 'gift'

interface MoodOption {
  key: MoodKey
  label: string
  title: string
  description: string
  perfumeIds: string[]
}

const MOODS: MoodOption[] = [
  {
    key: 'calm',
    label: 'هادئ',
    title: 'هدوء نظيف وخفيف',
    description: 'لو تحب رائحة قريبة من البشرة، ناعمة، ومريحة طوال اليوم.',
    perfumeIds: ['nasamah', 'musk-nowar'],
  },
  {
    key: 'evening',
    label: 'مسائي',
    title: 'أثر أعمق وأكثر دفئًا',
    description: 'لو تريد عطرًا يلفت الانتباه مساءً ويترك حضورًا واضحًا.',
    perfumeIds: ['night', 'amber-oud'],
  },
  {
    key: 'formal',
    label: 'رسمي',
    title: 'فخامة محسوبة وواثقة',
    description: 'لو تبحث عن عطر يليق بالمجالس، الاجتماعات، والمناسبات الأنيقة.',
    perfumeIds: ['oud-royal', 'amber-oud'],
  },
  {
    key: 'gift',
    label: 'هدية',
    title: 'اختيار آمن وأنيق',
    description: 'لو هدفك هدية تليق بالمظهر والمحتوى والتغليف.',
    perfumeIds: ['rose-damascus', 'oud-royal'],
  },
]

export function FragranceQuiz() {
  const [selectedMood, setSelectedMood] = useState<MoodKey>('calm')
  const ref = useScrollReveal<HTMLDivElement>()

  const selectedConfig = useMemo(
    () => MOODS.find((mood) => mood.key === selectedMood) ?? MOODS[0],
    [selectedMood],
  )

  const recommendedPerfumes = useMemo(
    () =>
      selectedConfig.perfumeIds
        .map((id) => PERFUMES.find((perfume) => perfume.id === id))
        .filter(Boolean),
    [selectedConfig],
  )

  return (
    <section className="section bg-ivory-2 border-y border-gold-soft" id="quiz">
      <div className="wrap">
        <div
          ref={ref}
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)] grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start"
        >
          <div>
            <span className="eyebrow">اختياراتنا لك</span>
            <h2 className="font-ar-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mt-4 leading-tight">
              ما العطر الذي يناسب مزاجك اليوم؟
            </h2>
            <p className="font-ar-body text-base md:text-lg leading-loose text-grey mt-6 max-w-2xl">
              اختر المزاج الأقرب لك، وسنقترح عليك عطرين ينسجمان مع لحظة الاستخدام: هادئ،
              مسائي، رسمي، أو هدية.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {MOODS.map((mood) => {
                const active = mood.key === selectedMood

                return (
                  <button
                    key={mood.key}
                    type="button"
                    onClick={() => setSelectedMood(mood.key)}
                    className={`rounded-lg border px-4 py-4 text-right transition-all duration-300 ${
                      active
                        ? 'border-gold bg-gold-wash shadow-sm'
                        : 'border-gold-soft bg-ivory hover:border-gold hover:bg-gold-wash/60'
                    }`}
                  >
                    <div className="font-ar-display font-bold text-lg text-charcoal">{mood.label}</div>
                    <div className="font-body text-[11px] tracking-widest uppercase text-grey-3 mt-2">
                      Mood
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-gold-soft bg-ivory px-6 py-6 md:px-7 md:py-7 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-wash text-gold-dark flex-shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="font-ar-display font-bold text-2xl text-charcoal">
                    {selectedConfig.title}
                  </p>
                  <p className="font-ar-body text-sm md:text-base text-grey mt-2 leading-relaxed">
                    {selectedConfig.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {recommendedPerfumes.map((perfume) => (
                  <div
                    key={perfume?.id}
                    className="rounded-full border border-gold-soft bg-white px-4 py-2 font-ar-body text-sm text-charcoal"
                  >
                    {perfume?.ar}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gold-soft bg-charcoal text-cream p-6 md:p-7 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_-20%,rgba(182,138,53,0.18),transparent_60%)] pointer-events-none"></div>
            <div className="relative">
              <div className="flex items-center gap-2 text-gold text-sm tracking-widest uppercase font-body">
                <Gift size={16} />
                ترشيح خاص
              </div>

              <h3 className="font-ar-display font-bold text-2xl md:text-3xl text-ivory mt-4">
                {recommendedPerfumes[0]?.ar}
              </h3>

              <p className="font-ar-body text-sm md:text-base leading-loose text-grey-3 mt-4">
                {recommendedPerfumes[0]?.description}
              </p>

              <div className="mt-6 space-y-3">
                {recommendedPerfumes.map((perfume) => (
                  <Link
                    key={perfume?.id}
                    to={`/product/${perfume?.id}`}
                    className="flex items-center justify-between rounded-lg border border-charcoal-3 bg-charcoal-2 px-4 py-4 transition-colors hover:border-gold hover:bg-charcoal-3"
                  >
                    <div>
                      <p className="font-ar-body font-semibold text-ivory">{perfume?.ar}</p>
                      <p className="font-ar-body text-xs text-grey-3 mt-1">{perfume?.notes}</p>
                    </div>
                    <ArrowLeft size={16} className="text-gold" />
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-charcoal-3 bg-charcoal-2 p-4">
                <p className="font-ar-body text-sm text-cream">
                  نصيحة سريعة: لو كنت محتارًا، اختر {recommendedPerfumes[0]?.ar} لأنه الأقرب
                  لروح هذا المزاج.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
