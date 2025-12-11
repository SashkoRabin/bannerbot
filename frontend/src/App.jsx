import React, { useState, useEffect } from 'react';
import {
  Scale,
  ShieldCheck,
  FileText,
  PhoneCall,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
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

  // ---- ДАННЫЕ ДЛЯ КАРУСЕЛИ ОТЗЫВОВ ----
 const testimonials = [
  {
    name: 'Ольга Антонова',
    role: 'трудовой спор',
    text:
      'После длительной задержки зарплаты обратилась к Михаилу. Он тщательно изучил документы, выстроил стратегию и уже через месяц работодатель полностью погасил долг. Впечатлил спокойный и уверенный подход.',
    date: 'январь 2025',
    rating: 5,
    tag: 'Трудовое право',
  },
  {
    name: 'Сергей Трофимов',
    role: 'военнослужащий',
    text:
      'Нужно было восстановить законные выплаты после перевода. Михаил сразу понял суть проблемы, собрал доказательства и помог добиться пересмотра решения комиссии. Очень благодарен.',
    date: 'октябрь 2024',
    rating: 5,
    tag: 'Военное право',
  },
  {
    name: 'Анастасия Миронова',
    role: 'семейный спор',
    text:
      'Сложное дело с определением места жительства ребёнка. Михаил вел переговоры аккуратно и профессионально, сохранил спокойствие в эмоциональной ситуации. Итог — решение в мою пользу.',
    date: 'август 2024',
    rating: 5,
    tag: 'Семейное право',
  },
  {
    name: 'Роман Ч.',
    role: 'уголовное дело (защита)',
    text:
      'Попал в неприятную ситуацию и нуждался в защите на стадии следствия. Михаил помог подготовить позицию, участвовал в допросах и отстоял мои права. Дело закрыли — благодарю.',
    date: 'июнь 2024',
    rating: 5,
    tag: 'Уголовная защита',
  },
  {
    name: 'Лилия Воронова',
    role: 'спор с работодателем',
    text:
      'Работодатель пытался уволить «по статье», чтобы избежать компенсаций. Юрист оперативно вмешался, документально опроверг доводы и помог восстановиться на работе. Очень рекомендую.',
    date: 'март 2024',
    rating: 4,
    tag: 'Трудовые споры',
  },
  {
    name: 'Денис Коваленко',
    role: 'банковский спор',
    text:
      'Банк списывал скрытые комиссии по кредиту. Михаил грамотно составил претензию, помог собрать доказательства и вернул значительную часть средств. Приятно работать с профессионалом.',
    date: 'январь 2024',
    rating: 5,
    tag: 'Банковские споры',
  },
  {
    name: 'Вероника Андреева',
    role: 'потребительский спор',
    text:
      'Компания-исполнитель отказалась исправлять некачественную работу. Михаил подготовил юридически грамотное обращение, и нам полностью вернули деньги. Всё быстро и вежливо.',
    date: 'ноябрь 2023',
    rating: 5,
    tag: 'Защита прав потребителей',
  },
  {
    name: 'Игорь Ж.',
    role: 'спор по недвижимости',
    text:
      'Возник конфликт с продавцом по поводу скрытых дефектов жилья. Юрист доказал нарушение условий договора и помог добиться компенсации. Спасибо за внимательность и точность.',
    date: 'октябрь 2023',
    rating: 5,
    tag: 'Недвижимость',
  },
  {
    name: 'Татьяна К.',
    role: 'семейный конфликт',
    text:
      'Было необходимо оформить соглашение и урегулировать имущественный вопрос. Михаил всё разъяснил простым языком, подготовил документы и помог прийти к мирному решению.',
    date: 'август 2023',
    rating: 5,
    tag: 'Семейное право',
  },
  {
    name: 'Александр Громов',
    role: 'гражданский спор',
    text:
      'Спор с подрядчиком по неисполненному договору. Михаил грамотно выстроил доказательную базу, участвовал в переговорах — деньги были возвращены в полном объёме.',
    date: 'июнь 2023',
    rating: 5,
    tag: 'Гражданские дела',
  },
];



  const [currentReview, setCurrentReview] = useState(0);

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevReview = () => {
    setCurrentReview((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Автоматическая прокрутка карусели
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % testimonials.length);
    }, 20000); // раз в 8 секунд

    return () => clearInterval(timer);
  }, [testimonials.length]);

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

  const currentTestimonial = testimonials[currentReview];

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
                      src="image.jpg"
                      alt="Блинов Михаил Сергеевич"
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.heroName}>
                    Блинов Михаил Сергеевич
                    <img
                      className={styles.asotiation}
                      src="/imaga.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.heroRole}>Практикующий юрист</div>
                </div>
              </div>

              <div className={styles.heroCardBody}>
                <div className={styles.heroStatRow}>
                  <div>
                    <div className={styles.heroStatLabel}>
                      Основные направления
                    </div>
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
                  *Показатель рассчитан на основе дел, завершённых за последние
                  3 года.
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

        {/* БЛОК: ОТЗЫВЫ КЛИЕНТОВ (КАРУСЕЛЬ) */}
        <section className={`${styles.section} ${styles.reviewsSection || ''}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Отзывы клиентов</h2>
            <p className={styles.sectionSubtitle}>
              Часть людей, которые уже прошли со мной сложные ситуации и смогли
              защитить свои права.
            </p>
          </div>

          <div className={styles.reviewsShell}>
            <button
              type="button"
              className={styles.reviewsNavButton}
              onClick={handlePrevReview}
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className={styles.reviewsNavIcon} />
            </button>

            <article className={styles.reviewsCard}>
              <div className={styles.reviewsQuoteMark}>
                <Quote className={styles.reviewsQuoteIcon} />
              </div>

              <div className={styles.reviewsTagRow}>
                <span className={styles.reviewsTag}>
                  {currentTestimonial.tag}
                </span>
                <span className={styles.reviewsDate}>
                  {currentTestimonial.date}
                </span>
              </div>

              <p className={styles.reviewsText}>{currentTestimonial.text}</p>

              <div className={styles.reviewsFooter}>
                <div className={styles.reviewsClient}>
                  <div className={styles.reviewsAvatarStub}>
                    {currentTestimonial.name[0]}
                  </div>
                  <div>
                    <div className={styles.reviewsName}>
                      {currentTestimonial.name}
                    </div>
                    <div className={styles.reviewsMeta}>
                      {currentTestimonial.role}
                    </div>
                  </div>
                </div>

                <div className={styles.reviewsRating}>
                  {Array.from({ length: currentTestimonial.rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className={styles.reviewsStar}
                        aria-hidden="true"
                      />
                    )
                  )}
                </div>
              </div>
            </article>

            <button
              type="button"
              className={styles.reviewsNavButton}
              onClick={handleNextReview}
              aria-label="Следующий отзыв"
            >
              <ChevronRight className={styles.reviewsNavIcon} />
            </button>
          </div>

          <div className={styles.reviewsDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                className={
                  index === currentReview
                    ? styles.reviewsDotActive
                    : styles.reviewsDot
                }
                onClick={() => setCurrentReview(index)}
                aria-label={`Показать отзыв ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* БЛОК: КОНТАКТЫ + ФОРМА */}
        <section className={styles.section} id="contact-form">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Оставьте заявку на консультацию
            </h2>
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
                      Номер телефона{' '}
                      <span className={styles.formRequired}>*</span>
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

                  {formError && (
                    <div className={styles.formError}>{formError}</div>
                  )}

                  {formSuccess && (
                    <div className={styles.formSuccess}>
                      <CheckCircle2 className={styles.formSuccessIcon} />
                      <span>
                        Заявка отправлена. Я свяжусь с вами в ближайшее рабочее
                        время.
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
              <span className={styles.footerName}>
                Блинов Михаил Сергеевич
              </span>
              <span className={styles.footerRole}>Юридическая помощь</span>
            </div>
            <div className={styles.footerMeta}>
              <span>
                © 2014 - {new Date().getFullYear()} Все права защищены.
              </span>
              <span className={styles.footerDot}>•</span>
              <span>Информация на сайте не является публичной офертой.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
