import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  FileText,
  PhoneCall,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';
import styles from './App.module.css';

export default function App() {
  // URL бэкенда (Render)
  const BACKEND_URL = 'https://bannerbot-7le0.onrender.com';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    inn: '', // используем как "описание ситуации" для совместимости с backend
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const numbers = value.replace(/\D/g, '');
      let formatted = '';

      if (numbers.length > 0) {
        formatted = '+' + numbers.substring(0, 1);
        if (numbers.length > 1) formatted += ' (' + numbers.substring(1, 4);
        if (numbers.length >= 4) formatted += ') ' + numbers.substring(4, 7);
        if (numbers.length >= 7) formatted += '-' + numbers.substring(7, 9);
        if (numbers.length >= 9) formatted += '-' + numbers.substring(9, 11);
      }

      setFormData((prev) => ({ ...prev, phone: formatted }));
    } else if (name === 'inn') {
      // описание ситуации
      const text = value.substring(0, 1200);
      setFormData((prev) => ({ ...prev, inn: text }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setFormError('');
    setFormSuccess(false);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return 'Пожалуйста, укажите ваше ФИО.';
    }
    if (formData.phone.replace(/\D/g, '').length < 11) {
      return 'Пожалуйста, введите корректный номер телефона.';
    }
    if (!formData.inn.trim()) {
      return 'Пожалуйста, кратко опишите вашу ситуацию.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();

    if (error) {
      setFormError(error);
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    setFormSuccess(false);

    try {
      await fetch(`${BACKEND_URL}/api/form/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setFormSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        inn: '',
      });
    } catch (err) {
      console.error(err);
      setFormError('Произошла ошибка при отправке. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.app}>
      {/* Фон со свечением и сеткой */}
      <div className={styles.bgLayer}>
        <div className={`${styles.blob} ${styles.blobPurple}`} />
        <div className={`${styles.blob} ${styles.blobBlue}`} />
        <div className={`${styles.blob} ${styles.blobEmerald}`} />
        <div className={styles.gridOverlay} />
      </div>

      <div className={styles.page}>
        {/* HERO */}
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              <span>Персональный юридический советник</span>
            </div>

            <h1 className={styles.heroTitle}>
              Юрист
              <br />
              <span>Блинов Михаил Сергеевич</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Помогаю защищать права и интересы в сложных жизненных ситуациях:
              проблемы военнослужащих, споры с работодателем, семейные конфликты,
              долги, уголовные дела. Персональный подход и максимальная
              конфиденциальность.
            </p>

            <div className={styles.heroActions}>
              <button
                type="button"
                className={styles.heroPrimaryBtn}
                onClick={scrollToForm}
              >
                <PhoneCall className={styles.heroPrimaryIcon} />
                <span>Получить бесплатную консультацию</span>
              </button>

              <div className={styles.heroMeta}>
                <div className={styles.heroMetaLine}>
                  <ShieldCheck className={styles.heroMetaIcon} />
                  <span>Более 10 лет юридической практики</span>
                </div>
                <div className={styles.heroMetaLine}>
                  <FileText className={styles.heroMetaIcon} />
                  <span>Свыше 1 200 решённых дел</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroCard}>
            <div className={styles.heroCardInner}>
              <div className={styles.heroCardHeader}>
                <div className={styles.heroAvatar}>
                  <div className={styles.heroAvatarInitials}>
                    <img
                      className={styles.heroImg}
                      src="https://static8.depositphotos.com/1002026/936/i/450/depositphotos_9365427-stock-photo-lawyer-on-his-workplace.jpg"
                      alt="Блинов Михаил Сергеевич"
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.heroName}>
                    Блинов Михаил Сергеевич
                    <img className={styles.asotiation} src='/imaga.png' alt='' /> 
                  </div>
                  <div className={styles.heroRole}>Практикующий юрист</div>
                </div>
              </div>

              <div className={styles.heroCardBody}>
                <div className={styles.heroStatRow}>
                  <div>
                    <div className={styles.heroStatLabel}>Основные направления</div>
                    <div className={styles.heroStatValue}>
                      Трудовые, военные, семейные, гражданские, уголовные дела
                    </div>
                  </div>
                </div>

                <div className={styles.heroStatGrid}>
                  <div className={styles.heroStat}>
                    <div className={styles.heroStatNumber}>10+</div>
                    <div className={styles.heroStatText}>лет практики</div>
                  </div>
                  <div className={styles.heroStat}>
                    <div className={styles.heroStatNumber}>87%</div>
                    <div className={styles.heroStatText}>
                      дел с положительным результатом*
                    </div>
                  </div>
                  <div className={styles.heroStat}>
                    <div className={styles.heroStatNumber}>24/7</div>
                    <div className={styles.heroStatText}>приём заявок</div>
                  </div>
                </div>

                <div className={styles.heroFootnote}>
                  *Показатель рассчитан на основе дел, завершённых за последние 3 года.
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* БЛОК: НАПРАВЛЕНИЯ РАБОТЫ */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>В чём я могу помочь</h2>
            <p className={styles.sectionSubtitle}>
              Работаю со спорами любой сложности. Каждое дело разбираю
              индивидуально, с учётом документов, обстоятельств и ваших целей.
            </p>
          </div>

          <div className={styles.grid3}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Scale className={styles.featureIcon} />
              </div>
              <div className={styles.featureTitle}>Гражданские споры</div>
              <p className={styles.featureText}>
                Долги, имущество, договоры, защита прав потребителей, споры с
                банками и страховыми компаниями.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <FileText className={styles.featureIcon} />
              </div>
              <div className={styles.featureTitle}>Трудовые и семейные дела</div>
              <p className={styles.featureText}>
                Невыплата заработной платы, увольнения, алименты, раздел
                имущества, определение места жительства ребёнка.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <ShieldCheck className={styles.featureIcon} />
              </div>
              <div className={styles.featureTitle}>Уголовно-правовая защита</div>
              <p className={styles.featureText}>
                Защита прав на стадии проверки, следствия и в суде. Помощь
                подозреваемым, обвиняемым и потерпевшим.
              </p>
            </div>
          </div>
        </section>

        {/* БЛОК: ПОЧЕМУ СО МНОЙ */}
        <section className={styles.sectionAlt}>
          <div className={styles.sectionHeaderAlt}>
            <h2 className={styles.sectionTitle}>Почему мне доверяют</h2>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyLabel}>01</div>
              <h3 className={styles.whyTitle}>Прозрачность и честность</h3>
              <p className={styles.whyText}>
                Реально оцениваю перспективы дела и заранее проговариваю
                возможные исходы, риски и стоимость работы.
              </p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyLabel}>02</div>
              <h3 className={styles.whyTitle}>Персональный подход</h3>
              <p className={styles.whyText}>
                Не использую шаблонные решения. Стратегия выстраивается под
                конкретную ситуацию, опираясь на документы и доказательства.
              </p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyLabel}>03</div>
              <h3 className={styles.whyTitle}>Конфиденциальность</h3>
              <p className={styles.whyText}>
                Вся переданная информация строго конфиденциальна. Данные не
                передаются третьим лицам без вашего согласия.
              </p>
            </div>
          </div>
        </section>

        {/* БЛОК: КОНТАКТЫ + ФОРМА */}
        <section className={styles.section} id="contact-form">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Оставьте заявку на консультацию</h2>
            <p className={styles.sectionSubtitle}>
              Опишите вашу ситуацию — я изучу вопрос и предложу возможные пути
              решения. Первичный разбор и ориентировочная стратегия — бесплатно.
            </p>
          </div>

          <div className={styles.contactLayout}>
            <div className={styles.contactInfo}>
              <div className={styles.contactBlock}>
                <div className={styles.contactRow}>
                  <PhoneCall className={styles.contactIcon} />
                  <div>
                    <div className={styles.contactLabel}>Телефон</div>
                    <div className={styles.contactValue}>
                      по запросу после заявки
                    </div>
                  </div>
                </div>

                <div className={styles.contactRow}>
                  <Clock className={styles.contactIcon} />
                  <div>
                    <div className={styles.contactLabel}>Время работы</div>
                    <div className={styles.contactValue}>
                      Пн–Пт: 10:00–19:00
                      <br />
                      Запись на консультацию — 24/7
                    </div>
                  </div>
                </div>

                <div className={styles.contactRow}>
                  <MapPin className={styles.contactIcon} />
                  <div>
                    <div className={styles.contactLabel}>Формат работы</div>
                    <div className={styles.contactValue}>
                      Онлайн-консультации, письменные заключения,
                      представительство в судах.
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.contactNote}>
                <ShieldCheck className={styles.contactNoteIcon} />
                <span>
                  Вся информация, указанная в заявке, передаётся по защищённому
                  каналу и не раскрывается третьим лицам.
                </span>
              </div>
            </div>

            <div className={styles.formCard}>
              <div className={styles.formCardInner}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>
                      Ваше ФИО <span className={styles.formRequired}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Иванов Иван Иванович"
                      className={styles.input}
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.formLabel}>
                      Номер телефона <span className={styles.formRequired}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      className={styles.input}
                      autoComplete="tel"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.formLabel}>
                      Кратко опишите вашу ситуацию{' '}
                      <span className={styles.formRequired}>*</span>
                    </label>
                    <textarea
                      name="inn"
                      value={formData.inn}
                      onChange={handleChange}
                      placeholder="Например: работодатель не выплачивает зарплату уже 2 месяца, есть трудовой договор и переписка..."
                      className={`${styles.input} ${styles.textarea}`}
                      maxLength={1200}
                    />
                  </div>

                  {formError && <div className={styles.formError}>{formError}</div>}

                  {formSuccess && (
                    <div className={styles.formSuccess}>
                      <CheckCircle2 className={styles.formSuccessIcon} />
                      <span>
                        Заявка отправлена. Я свяжусь с вами в ближайшее рабочее время.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.loaderInline} />
                    ) : (
                      <Send className={styles.submitIcon} />
                    )}
                    <span>
                      {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </span>
                  </button>

                  <p className={styles.formDisclaimer}>
                    Нажимая «Отправить заявку», вы соглашаетесь с обработкой
                    персональных данных и условиями конфиденциальности.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <span className={styles.footerName}>Блинов Михаил Сергеевич</span>
              <span className={styles.footerRole}>Юридическая помощь</span>
            </div>
            <div className={styles.footerMeta}>
              <span>© 2014 - {new Date().getFullYear()} Все права защищены.</span>
              <span className={styles.footerDot}>•</span>
              <span>Информация на сайте не является публичной офертой.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
