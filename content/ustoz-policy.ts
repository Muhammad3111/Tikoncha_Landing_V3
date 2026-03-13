import type { Lang } from "@/lib/i18n/config";
import type { PolicyContent } from "@/content/policies";

const ustozPrivacyPolicyUz: PolicyContent = {
  title: "Ustoz Tikoncha Maxfiylik Siyosati",
  intro:
    "Oxirgi yangilanish: 2025-yil. Ushbu Maxfiylik Siyosati NEW EDU MChJ (\"Tikoncha\", \"biz\") tomonidan ishlab chiqilgan Ustoz Tikoncha ilovasi foydalanuvchilari ma'lumotlari qanday to'planishi, ishlatilishi va himoya qilinishini tushuntiradi.",
  sections: [
    {
      id: "data-collection",
      title: "1. Biz to'playdigan ma'lumotlar",
      description: "Ustoz Tikoncha o'qituvchilardan faqat quyidagi ma'lumotlarni to'playdi:",
      items: [
        "Ism — profilni to'ldirish uchun",
        "Telefon raqami — tizimga kirish va autentifikatsiya uchun",
      ],
      note: "Biz joylashuv ma'lumotlari, qurilma identifikatorlari, brauzer tarixi yoki boshqa shaxsiy ma'lumotlarni to'plamaymiz.",
    },
    {
      id: "data-usage",
      title: "2. Ma'lumotlar qanday ishlatiladi",
      description: "To'plangan ma'lumotlar faqat quyidagi maqsadlarda ishlatiladi:",
      items: [
        "O'qituvchi hisobini yaratish va tizimga kirishni ta'minlash",
        "O'qituvchiga tegishli sinf va o'quvchilarni ko'rsatish",
        "Ota-onalar bilan bog'lanish jarayonini boshqarish",
        "Ilovaning to'g'ri ishlashini ta'minlash",
      ],
      note: "Biz sizning ma'lumotlaringizni uchinchi shaxslarga sotmaymiz, ijaraga bermaymiz yoki marketing maqsadlarida ishlatmaymiz.",
    },
    {
      id: "data-storage",
      title: "3. Ma'lumotlarni saqlash",
      description:
        "Barcha ma'lumotlar O'zbekiston Respublikasi hududida joylashgan Tikoncha serverlarida xavfsiz tarzda saqlanadi. Ma'lumotlar shifrlangan holda uzatiladi va himoya qilinadi.",
    },
    {
      id: "third-party-services",
      title: "4. Uchinchi tomon xizmatlari",
      description:
        "Ustoz Tikoncha autentifikatsiya jarayonida Telegram botidan foydalanadi. Telegram orqali yuborilgan ma'lumotlar Telegram'ning o'z maxfiylik siyosatiga bo'ysunadi.",
      note: "Biz Telegram'ga hech qanday shaxsiy ma'lumot uzatmaymiz — faqat OTP tasdiqlash jarayoni amalga oshiriladi.",
    },
    {
      id: "student-data",
      title: "5. O'quvchilar ma'lumotlari",
      description:
        "Ustoz Tikoncha orqali o'qituvchi o'quvchilarning ekran vaqti statistikasini ko'rishi mumkin. Ushbu ma'lumotlar o'quvchining qurilmasidan bevosita Tikoncha serverlariga yuboriladi. O'qituvchi ushbu ma'lumotlarni faqat o'z sinfi doirasida ko'rishi mumkin.",
      note: "Ma'lumotlar uchinchi shaxslarga berilmaydi.",
    },
    {
      id: "user-rights",
      title: "6. Foydalanuvchi huquqlari",
      description: "Siz istalgan vaqtda quyidagi huquqlarga egasiz:",
      items: [
        "O'z ma'lumotlaringizni ko'rish va tahrirlash",
        "Hisobingizni o'chirish va ma'lumotlaringizni butunlay o'chirish talabini yuborish",
        "Ma'lumotlaringizni qayta ishlashga rozilikni qaytarib olish",
      ],
      note: "Ushbu huquqlardan foydalanish uchun info@tikoncha.uz manziliga murojaat qiling.",
    },
    {
      id: "data-security",
      title: "7. Ma'lumotlar xavfsizligi",
      description:
        "Biz foydalanuvchi ma'lumotlarini himoya qilish uchun zamonaviy xavfsizlik choralarini qo'llaymiz: shifrlangan ulanish (HTTPS), xavfsiz server muhiti va cheklangan kirish huquqlari.",
      note: "Biroq internet orqali uzatiladigan hech qanday ma'lumot 100% xavfsiz emasligini inobatga olish kerak.",
    },
    {
      id: "children-privacy",
      title: "8. Bolalar maxfiyligi",
      description:
        "Ustoz Tikoncha ilovasi faqat o'qituvchilar uchun mo'ljallangan. Ilova 18 yoshdan kichik foydalanuvchilar uchun mo'ljallanmagan. Agar siz 18 yoshdan kichik bo'lsangiz, ilovadan foydalanmang.",
    },
    {
      id: "policy-updates",
      title: "9. Siyosatga o'zgartirishlar",
      description:
        "Ushbu maxfiylik siyosati vaqti-vaqti bilan yangilanishi mumkin. O'zgarishlar ilovada yoki tikoncha.uz saytida e'lon qilinadi. Ilovadan foydalanishni davom ettirishingiz yangi siyosatni qabul qilganligingizni bildiradi.",
    },
    {
      id: "contact",
      title: "10. Bog'lanish",
      description: "Savollar yoki murojaatlar uchun:",
      items: [
        "NEW EDU MChJ",
        "Email: info@tikoncha.uz",
        "Veb-sayt: tikoncha.uz",
        "O'zbekiston, Andijon viloyati",
      ],
    },
  ],
};

const ustozPrivacyPolicyRu: PolicyContent = {
  title: "Политика конфиденциальности Ustoz Tikoncha",
  intro:
    "Последнее обновление: 2025 год. Настоящая Политика конфиденциальности разработана компанией NEW EDU MChJ (далее — «Tikoncha», «мы») и описывает, какие данные собираются, как используются и как защищаются в приложении Ustoz Tikoncha.",
  sections: [
    {
      id: "data-collection",
      title: "1. Данные, которые мы собираем",
      description: "Приложение Ustoz Tikoncha собирает от учителей только следующие данные:",
      items: [
        "Имя — для заполнения профиля",
        "Номер телефона — для входа в систему и аутентификации",
      ],
      note: "Мы не собираем данные о местоположении, идентификаторы устройств, историю браузера или иные персональные данные.",
    },
    {
      id: "data-usage",
      title: "2. Как используются данные",
      description: "Собранные данные используются исключительно в следующих целях:",
      items: [
        "Создание учётной записи учителя и обеспечение входа в систему",
        "Отображение закреплённых за учителем классов и учеников",
        "Управление процессом подключения родителей",
        "Обеспечение корректной работы приложения",
      ],
      note: "Мы не продаём, не сдаём в аренду и не используем ваши данные в маркетинговых целях третьих сторон.",
    },
    {
      id: "data-storage",
      title: "3. Хранение данных",
      description:
        "Все данные хранятся на серверах Tikoncha, расположенных на территории Республики Узбекистан. Передача данных осуществляется в зашифрованном виде.",
    },
    {
      id: "third-party-services",
      title: "4. Сторонние сервисы",
      description:
        "Для аутентификации Ustoz Tikoncha использует Telegram-бот. Данные, передаваемые через Telegram, регулируются политикой конфиденциальности Telegram.",
      note: "Мы не передаём персональные данные в Telegram — через него осуществляется только подтверждение OTP-кода.",
    },
    {
      id: "student-data",
      title: "5. Данные учеников",
      description:
        "Через Ustoz Tikoncha учитель может просматривать статистику экранного времени учеников. Эти данные передаются с устройства ученика напрямую на серверы Tikoncha. Учитель видит данные только своего класса.",
      note: "Данные не передаются третьим лицам.",
    },
    {
      id: "user-rights",
      title: "6. Права пользователей",
      description: "Вы имеете право в любое время:",
      items: [
        "Просматривать и редактировать свои данные",
        "Запросить удаление учётной записи и всех связанных данных",
        "Отозвать согласие на обработку данных",
      ],
      note: "Для реализации этих прав обратитесь по адресу info@tikoncha.uz.",
    },
    {
      id: "data-security",
      title: "7. Безопасность данных",
      description:
        "Мы применяем современные меры защиты данных: зашифрованное соединение (HTTPS), защищённая серверная среда и ограниченный доступ.",
      note: "Ни одна система передачи данных через интернет не является абсолютно защищённой.",
    },
    {
      id: "children-privacy",
      title: "8. Конфиденциальность несовершеннолетних",
      description:
        "Приложение Ustoz Tikoncha предназначено исключительно для учителей. Оно не рассчитано на пользователей младше 18 лет. Если вам нет 18 лет, пожалуйста, не используйте приложение.",
    },
    {
      id: "policy-updates",
      title: "9. Изменения в политике",
      description:
        "Настоящая политика конфиденциальности может периодически обновляться. Изменения публикуются в приложении или на сайте tikoncha.uz. Продолжение использования приложения означает согласие с обновлённой политикой.",
    },
    {
      id: "contact",
      title: "10. Контакты",
      description: "По вопросам и обращениям:",
      items: [
        "NEW EDU MChJ",
        "Email: info@tikoncha.uz",
        "Сайт: tikoncha.uz",
        "Республика Узбекистан, Андижанская область",
      ],
    },
  ],
};

const ustozPrivacyPolicyEn: PolicyContent = {
  title: "Ustoz Tikoncha Privacy Policy",
  intro:
    "Last updated: 2025. This Privacy Policy is provided by NEW EDU MChJ (referred to as \"Tikoncha\", \"we\", \"us\") and explains how we collect, use, and protect the personal data of users of the Ustoz Tikoncha application.",
  sections: [
    {
      id: "data-collection",
      title: "1. Data We Collect",
      description: "Ustoz Tikoncha collects only the following data from teachers:",
      items: [
        "Name — to complete your profile",
        "Phone number — for login and authentication",
      ],
      note: "We do not collect location data, device identifiers, browsing history, or any other personal information.",
    },
    {
      id: "data-usage",
      title: "2. How We Use Your Data",
      description: "Collected data is used solely for the following purposes:",
      items: [
        "Creating a teacher account and enabling login",
        "Displaying the classes and students assigned to the teacher",
        "Managing the parent linking process",
        "Ensuring the app functions correctly",
      ],
      note: "We do not sell, rent, or use your data for third-party marketing purposes.",
    },
    {
      id: "data-storage",
      title: "3. Data Storage",
      description:
        "All data is stored securely on Tikoncha servers located within the Republic of Uzbekistan. All data transfers are encrypted.",
    },
    {
      id: "third-party-services",
      title: "4. Third-Party Services",
      description:
        "Ustoz Tikoncha uses a Telegram bot for authentication purposes. Data transmitted through Telegram is subject to Telegram's own Privacy Policy.",
      note: "We do not share personal data with Telegram — only OTP verification is carried out through this channel.",
    },
    {
      id: "student-data",
      title: "5. Student Data",
      description:
        "Through Ustoz Tikoncha, teachers can view screen time statistics for their students. This data is transmitted directly from the student's device to Tikoncha servers. Teachers can only view data for students in their own class.",
      note: "Student data is never shared with third parties.",
    },
    {
      id: "user-rights",
      title: "6. Your Rights",
      description: "You have the right at any time to:",
      items: [
        "View and edit your personal data",
        "Request deletion of your account and all associated data",
        "Withdraw consent for data processing",
      ],
      note: "To exercise these rights, please contact us at info@tikoncha.uz.",
    },
    {
      id: "data-security",
      title: "7. Data Security",
      description:
        "We apply modern security measures to protect user data, including encrypted connections (HTTPS), a secure server environment, and restricted access controls.",
      note: "Please note that no method of data transmission over the internet is 100% secure.",
    },
    {
      id: "children-privacy",
      title: "8. Children's Privacy",
      description:
        "Ustoz Tikoncha is intended for use by teachers only. The app is not directed at users under the age of 18. If you are under 18, please do not use this application.",
    },
    {
      id: "policy-updates",
      title: "9. Changes to This Policy",
      description:
        "This Privacy Policy may be updated from time to time. Changes will be announced within the app or on tikoncha.uz. Continued use of the app following any changes constitutes acceptance of the updated policy.",
    },
    {
      id: "contact",
      title: "10. Contact Us",
      description: "For questions or requests:",
      items: [
        "NEW EDU MChJ",
        "Email: info@tikoncha.uz",
        "Website: tikoncha.uz",
        "Republic of Uzbekistan, Andijan Region",
      ],
    },
  ],
};

const ustozPrivacyPolicyByLang: Record<Lang, PolicyContent> = {
  uz: ustozPrivacyPolicyUz,
  ru: ustozPrivacyPolicyRu,
  en: ustozPrivacyPolicyEn,
};

export const getUstozPrivacyPolicyByLang = (lang: Lang): PolicyContent => ustozPrivacyPolicyByLang[lang];
