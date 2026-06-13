import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, User, Phone, Users, MessageCircle } from 'lucide-react';

type FieldKey = 'name' | 'phone' | 'guests' | 'attendance';
interface Form { name: string; phone: string; guests: string; attendance: string; }
type Errors = Partial<Record<FieldKey, string>>;

const fields: { key: FieldKey; icon: typeof User; type: string; placeholder: string }[] = [
  { key: 'name', icon: User, type: 'text', placeholder: 'الاسم الكريم' },
  { key: 'phone', icon: Phone, type: 'tel', placeholder: 'رقم الهاتف' },
  { key: 'guests', icon: Users, type: 'number', placeholder: 'عدد المرافقين' },
  { key: 'attendance', icon: MessageCircle, type: 'select', placeholder: 'تأكيد الحضور' },
];

const attendanceOptions = [
  { value: 'yes', label: 'إن شاء الله سأحضر' },
  { value: 'no', label: 'لن أتمكن من الحضور' },
  { value: 'maybe', label: 'لم أقرر بعد' },
];

export default function RSVP() {
  const [form, setForm] = useState<Form>({ name: '', phone: '', guests: '1', attendance: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<FieldKey | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'يرجى إدخال الاسم';
    if (!form.phone.trim()) e.phone = 'يرجى إدخال رقم الهاتف';
    else if (!/^[\d+\- ]{7,15}$/.test(form.phone)) e.phone = 'رقم غير صحيح';
    if (!form.guests || parseInt(form.guests) < 1) e.guests = 'عدد غير صحيح';
    if (!form.attendance) e.attendance = 'يرجى الاختيار';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  function update(key: FieldKey, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  return (
    <section id="rsvp" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-400/[0.02] via-transparent to-gold-400/[0.02]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gold-gradient mb-2 sm:mb-3">
            تأكيد الحضور
          </h2>
          <p className="text-ivory/40 text-sm sm:text-base md:text-lg">ننتظركم لنكمل فرحتنا</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessView name={form.name} />
          ) : (
            <motion.form
              ref={formRef}
              key="form"
              onSubmit={submit}
              className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-gold-400/10 gold-shadow space-y-4 sm:space-y-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {fields.map(({ key, icon: Icon, type, placeholder }) => (
                <div key={key}>
                  <div
                    className={`flex items-center gap-3 glass rounded-xl border transition-all duration-300 ${
                      errors[key] ? 'border-rose-400/40' : focused === key ? 'border-gold-400/40' : 'border-gold-400/10'
                    } ${focused === key ? 'gold-shadow' : ''}`}
                  >
                    <div className="pr-3 sm:pr-4">
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${focused === key ? 'text-gold-400' : 'text-gold-400/30'}`} />
                    </div>

                    {type === 'select' ? (
                      <select
                        value={form.attendance}
                        onChange={(e) => update('attendance', e.target.value)}
                        onFocus={() => setFocused('attendance')}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent py-3 sm:py-3.5 pl-3 sm:pl-4 text-ivory text-sm sm:text-base outline-none appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-navy-800">{placeholder}</option>
                        {attendanceOptions.map((o) => (
                          <option key={o.value} value={o.value} className="bg-navy-800">{o.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) => update(key, e.target.value)}
                        onFocus={() => setFocused(key)}
                        onBlur={() => setFocused(null)}
                        placeholder={placeholder}
                        min={key === 'guests' ? 1 : undefined}
                        className="w-full bg-transparent py-3 sm:py-3.5 pl-3 sm:pl-4 text-ivory text-sm sm:text-base outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-ivory/30"
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {errors[key] && (
                      <motion.p
                        className="text-rose-400/80 text-xs sm:text-sm mt-1 mr-2"
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                      >
                        {errors[key]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <motion.button
                type="submit"
                className="group relative w-full py-3.5 sm:py-4 rounded-full gold-gradient-solid text-navy-950 font-bold text-sm sm:text-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] focus-visible:outline-2 focus-visible:outline-gold-400"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  تأكيد الحضور
                </span>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SuccessView({ name }: { name: string }) {
  return (
    <motion.div
      key="success"
      className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-center border border-gold-400/10 gold-shadow"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 200 }}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full gold-gradient-solid mx-auto mb-4 sm:mb-5 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-navy-950" />
        </div>
      </motion.div>

      <motion.h3
        className="text-2xl sm:text-3xl md:text-4xl font-bold gold-gradient mb-2 sm:mb-3"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        تم تأكيد الحضور
      </motion.h3>

      <motion.p
        className="text-ivory/50 text-sm sm:text-base md:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        شكراً لك {name}، نحن بانتظاركم في موعد المناسبة
      </motion.p>

      <motion.div
        className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {['🎉', '💐', '🥂'].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-xl sm:text-2xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
