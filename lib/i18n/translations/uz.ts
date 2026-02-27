import type { AppTranslations } from "../translations";

export const uzTranslations: AppTranslations = {
    layout: {
        siteName: "Tikoncha",
        defaultTitle: "Tikoncha",
        defaultDescription:
            "Farzandingiz uchun ekran vaqti nazorati, ilova bloklash va fokus rejimi ilovasi.",
        nav: {
            issue: "Muammo",
            consequences: "Oqibatlar",
            leadingCountries: "Yetakchi mamlakatlar",
            about: "Tikoncha haqida",
            team: "Jamoamiz",
        },
        footer: {
            tagline:
                "Yangi avlod ta'limi va raqamli xavfsizlik uchun ishonchli hamkor.",
            companyTitle: "Kompaniya",
            contactTitle: "Bog'lanish",
            companyLinks: {
                features: "Imkoniyatlar",
                subscription: "Obuna",
                about: "Biz haqimizda",
                team: "Jamoa",
            },
            location: "Andijon, O'zbekiston",
            phone: "+998 97 270 70 07",
            email: "info@tikoncha.uz",
            privacyPolicy: "Maxfiylik siyosati",
            terms: "Foydalanish shartlari",
            copyright: "© 2026 NEW EDU MChJ. Barcha huquqlar himoyalangan.",
        },
        languageSwitcherLabel: "Til",
        languages: {
            uz: "O'zbekcha",
            ru: "Ruscha",
            en: "Inglizcha",
        },
        aria: {
            openMenu: "Menyuni ochish",
            closeMenu: "Menyuni yopish",
            closeVideo: "Videoni yopish",
            socialLinks: "Ijtimoiy tarmoqlar",
            videoFallback: "Brauzeringiz video ijro etishni qo'llab-quvvatlamaydi.",
            heroImageAlt: "Tikoncha ilovasi rasmi",
        },
    },
    home: {
        meta: {
            title: "Tikoncha - Ota-ona nazorati va fokus ilovasi",
            description:
                "Ekran vaqtini cheklang, ijtimoiy tarmoqlar va o'yinlarni jadval bo'yicha bloklang. Tikoncha ichida ChatGPT va Telegram personal chat ham bor.",
            keywords:
                "ota ona nazorati ilovasi, ota ona nazorati, telefonda ota ona nazorati, bola telefonini nazorat qilish, bolalar uchun ota ona nazorati, ekran vaqti nazorati, telefon vaqtini cheklash, ilovani bloklash, o'yinlarni bloklash, ijtimoiy tarmoqlarni bloklash, instagramni bloklash, youtube ni bloklash, telegramni cheklash, dars paytida telefonni bloklash, fokus rejimi ilovasi, raqamli qaramlikdan chiqish, raqamli detoks, bolalar uchun xavfsiz internet, bilimdon ai, tikoncha ilovasi, tikoncha student, tikoncha parent, toshkent ota ona nazorati ilovasi, samarqand ota ona nazorati ilovasi, andijon ota ona nazorati ilovasi, fargona ota ona nazorati ilovasi, ozbekistonda ota ona nazorati, qozogistonda ota ona nazorati, qirgizistonda ota ona nazorati, tojikistonda ota ona nazorati, rossiyada ota ona nazorati, belarusda ota ona nazorati, ozarbayjonda ota ona nazorati, armanistonda ota ona nazorati, mdh uchun ota ona nazorati",
        },
        hero: {
            title: "Tikoncha ta‘qiq emas,",
            titleAccent: "to‘g‘ri nazorat",
            subtitle:
                "Farzandingiz texnologiyadan to‘g‘ri foydalanishni o'rganadi, telefon esa farzandingizni boshqara olmaydi",
            chipLabel: "Aqlli nazorat tizimi",
            playMarketLabel: "Play Market",
            appStoreLabel: "App store",
            videoLabel: "Videoni ko'rish",
        },
        sections: {
            problem: {
                title: "Muammo tobora",
                titleAccent: "kuchaymoqda!",
                subtitle:
                    "Statistika ogohlantirmoqda. Bu faqat raqamlar emas, bu bolalar hayoti.",
                sliderAriaLabel: "Muammo statistikasi slideri",
                dotsAriaLabel: "Sahifalar navigatsiyasi",
                slideAriaSuffix: "slaydi",
                sourceLabel: "Manba:",
                slides: [
                    {
                        title: "YO'QOTILGAN BOLALIK",
                        value: "8.5 soat",
                        description:
                            "O'smirlar kuniga o'rtacha 8 soat, 39 daqiqa vaqtini ekran qarshisida (ko'ngilochar maqsadda) o'tkazmoqda. Bu to'liq ish kunidan ham ko'proq.",
                        source: "Gallup Report 2023",
                        sourceHref: "https://news.gallup.com/",
                        imageAlt: "Yo'qotilgan bolalik statistikasi",
                        bodyHeight: 291,
                        sourceWidth: 287,
                        descriptionSize: 18,
                    },
                    {
                        title: "BEGONA HAYOT",
                        value: "4.8 soat",
                        description:
                            "17 yoshli o'smirlar kuniga 4.8 soat vaqtini faqat ijtimoiy tarmoqlarda (TikTok, Instagram) o'tkazadi.",
                        source: "Gallup Report 2023",
                        sourceHref: "https://news.gallup.com/",
                        imageAlt: "Ijtimoiy tarmoqdan foydalanish statistikasi",
                        bodyHeight: 252,
                        sourceWidth: 287,
                        descriptionSize: 16,
                    },
                    {
                        title: "DIQQAT PARCHALANISHI",
                        value: "20 daq",
                        description:
                            "O'quvchini telefondagi bitta bildirishnoma chalg'itgandan so'ng, diqqatini yana darsga to'liq qaytarishi uchun unga 20 daqiqa vaqt kerak bo'ladi.",
                        source: "UNESCO: Technology in Education Report",
                        sourceHref: "https://www.unesco.org/",
                        imageAlt: "Diqqat parchalanishi statistikasi",
                        bodyHeight: 279,
                        sourceWidth: 459,
                        descriptionSize: 16,
                    },
                    {
                        title: "DOIMIY ONLAYN",
                        value: "46%",
                        description:
                            "O'smirlarning deyarli yarmi (46%) Internetda 'deyarli tinimsiz' o'tirishini tan olgan.",
                        source: "Pew Research Center",
                        sourceHref: "https://www.pewresearch.org/",
                        imageAlt: "Doimiy onlayn bo'lish statistikasi",
                        bodyHeight: 252,
                        sourceWidth: 302,
                        descriptionSize: 16,
                    },
                    {
                        title: "DEPRESSIYA XAVFI",
                        value: "3 barobar",
                        description:
                            "Kuniga 3 soatdan ko'p vaqtini ijtimoiy tarmoqda o'tkazadigan o'smirlarda depressiya va xavotir (anxiety) xavfi uch baravar yuqori.",
                        source: "JAMA Psychiatry Study (Johns Hopkins)",
                        sourceHref:
                            "https://jamanetwork.com/journals/jamapsychiatry",
                        imageAlt: "Depressiya xavfi statistikasi",
                        bodyHeight: 252,
                        sourceWidth: 447,
                        descriptionSize: 16,
                    },
                ],
            },
            consequences: {
                title: "Oqibatlar",
                titleAccent: "jiddiy",
                subtitle:
                    "Ortiqcha ekran vaqti faqat vaqt isrofi emas. Bu bolalarning ruhiy va jismoniy salomatligiga ta'sir qilmoqda.",
                sliderAriaLabel: "Oqibatlar slideri",
                dotsAriaLabel: "Sahifalar navigatsiyasi",
                slideAriaSuffix: "slaydi",
                sourceLabel: "Manba:",
                slides: [
                    {
                        title: "Depressiya va xavotir",
                        description:
                            "Ijtimoiy tarmoqlardan haddan tashqari ko'p foydalanish o'smirlarda yolg'izlik, tushkunlik va xavotir (anxiety) hissini kuchaytiradi.",
                        source: "American Psychological Association (APA)",
                        sourceHref: "https://www.apa.org/",
                        imageAlt: "Depressiya va xavotir oqibatlari",
                        descriptionSize: 16,
                    },
                    {
                        title: "Uyqu buzilishi",
                        description:
                            "Ekran nuri uyqu gormonini bloklaydi. Oqibatda: surunkali charchoq, darsda uyqusirash va xotira pasayishi kuzatiladi.",
                        source: "Sleep Foundation",
                        sourceHref: "https://www.sleepfoundation.org/",
                        imageAlt: "Uyqu buzilishi oqibatlari",
                        descriptionSize: 16,
                    },
                    {
                        title: "Agressiya va asabiylik",
                        description:
                            "Telefondan ajratilganda bolada xuddi giyohvandlikdagi kabi \"uzilish sindromi\" (withdrawal) - bag'irish va janjal ko'tarish holatlari yuzaga keladi.",
                        source: "Swansea University Research",
                        sourceHref: "https://www.swansea.ac.uk/",
                        imageAlt: "Agressiya va asabiylik oqibatlari",
                        descriptionSize: 16,
                    },
                    {
                        title: "O'ziga past baho berish",
                        description:
                            'Ijtimoiy tarmoqlardagi "mukammal" hayotlar haqiqiy hayotni yetarli emasdek his qilishga olib keladi.',
                        source: "Wall Street Journal (Facebook Files)",
                        sourceHref: "https://www.wsj.com/",
                        imageAlt: "O'ziga past baho berish oqibatlari",
                        descriptionSize: 16,
                    },
                    {
                        title: "Suitsid xavfi",
                        description:
                            "Kiberbulling va ijtimoiy izolyatsiya o'smirlar o'rtasida o'z joniga qasd qilish fikrlarini kuchaytiruvchi asosiy xavf omillaridan biridir.",
                        source: "CDC (Kasalliklarni nazorat qilish markazi)",
                        sourceHref: "https://www.cdc.gov/",
                        imageAlt: "Suitsid xavfi oqibatlari",
                        descriptionSize: 16,
                    },
                ],
            },
            worldSolution: {
                title: "qanday kurashyapti?",
                titleAccent: "Dunyo",
                accentFirst: true,
                subtitle:
                    "Yetakchi mamlakatlar allaqachon jiddiy choralar ko'rmoqda",
                sliderAriaLabel: "Dunyo yechimlari slideri",
                dotsAriaLabel: "Sahifalar navigatsiyasi",
                slideAriaSuffix: "slaydi",
                sourceLabel: "Manba:",
                slides: [
                    {
                        title: "AQSh (Florida shtati)",
                        highlight: "- Yosh cheklovlari",
                        description:
                            "14 yoshgacha bo'lgan bolalar uchun ijtimoiy tarmoq akkauntlarini ochishni qonunan taqiqladi. 14-15 yoshlar uchun ota-ona roziligi shart.",
                        quote: "AQShning Florida shtati eng qat'iy qonunni qabul qildi:\n14 yoshgacha ijtimoiy tarmoqqa kirish taqiqlanadi - bolalar ruhiyatini asrash.",
                        source: "AP News: Florida bans social media for minors",
                        sourceHref: "https://apnews.com/",
                        imageAlt:
                            "Florida shtatida yosh cheklovi illyustratsiyasi",
                        sourceInQuote: true,
                        bodyHeight: 350,
                        descriptionSize: 17,
                    },
                    {
                        title: "Fransiya",
                        highlight: "- Maktablarda telefon taqiqi",
                        description:
                            "Maktab hududida (boshlang'ich va o'rta sinflarda) telefon ishlatishni to'liq taqiqladi (\"Digital pause\").",
                        quote: "Fransiyada 15 yoshgacha bo'lgan o'quvchilar maktabda telefon ishlata olmaydi.\nBu ta'lim sifatini oshirish uchun qo'llangan davlat strategiyasidir.",
                        source: "The Guardian: France school phone ban",
                        sourceHref: "https://www.theguardian.com/",
                        imageAlt:
                            "Fransiyada maktablarda telefon taqiqi illyustratsiyasi",
                        sourceInQuote: true,
                        bodyHeight: 350,
                        descriptionSize: 17,
                    },
                    {
                        title: "Xitoy",
                        highlight: "- Qat'iy vaqt limiti",
                        description:
                            "Voyaga yetmaganlar uchun onlayn o'yinlarga vaqt cheklovi qo'yildi (faqat juma, shanba, yakshanba kunlari 1 soatdan). TikTok (Douyin)da esa kunlik 40 daqiqa limit bor.",
                        quote: "Xitoy hukumati o'yinlarni \"ruhiy opium\" deb atadi va bolalar uchun o'yin vaqtini haftasiga 3 soat qilib belgiladi.",
                        source: "BBC: China limits gaming for under 18s",
                        sourceHref:
                            "https://www.bbc.com/news/technology-58384457",
                        imageAlt:
                            "Xitoydagi raqamli vaqt limiti illyustratsiyasi",
                        sourceInQuote: true,
                        bodyHeight: 350,
                        descriptionSize: 17,
                    },
                    {
                        title: "Buyuk Britaniya",
                        highlight: "- Online Safety Act",
                        description:
                            "Hukumat maktablarda telefonlarni taqiqlash bo'yicha yangi ko'rsatma chiqardi va \"Online Safety Act\" qonunini qabul qildi.",
                        quote: "Britaniya hukumati direktorlarga maktab kunida telefonlarni yig'ishtirib olish vakolatini berdi.\nMaqsad - sinfxonadagi tartibni tiklash.",
                        source: "BBC: UK government guidance on mobile phones in schools",
                        sourceHref: "https://www.bbc.com/news/",
                        imageAlt:
                            "Buyuk Britaniyada online safety qonuni illyustratsiyasi",
                        sourceInQuote: true,
                        bodyHeight: 350,
                        descriptionSize: 17,
                    },
                    {
                        title: "Yevropa Ittifoqi",
                        highlight: "- DSA & AI Act",
                        description:
                            '"Digital Services Act" (DSA) va "AI Act" orqali bolalarga zararli kontent ko\'rsatuvchi algoritmlarni qat\'iy nazoratga oldi.',
                        quote: "Yevropa Ittifoqi TikTok va Instagramni bolalar uchun xavfsiz qilish majburiyatini yukladi. Qoidabuzar platformalar milliardlab jarimaga tortiladi.",
                        source: "European Commission: Protection of Minors online",
                        sourceHref:
                            "https://digital-strategy.ec.europa.eu/en/policies/protection-minors-online",
                        imageAlt:
                            "Yevropa Ittifoqi raqamli xavfsizlik choralar illyustratsiyasi",
                        sourceInQuote: true,
                        bodyHeight: 350,
                        descriptionSize: 17,
                    },
                ],
            },
            notEnough: {
                title: "Lekin bu",
                titleAccent: "yetarli emas",
                subtitle:
                    "Ekstremal yechimlar ishlamaydi va ko'pincha teskari natija beradi",
                sliderAriaLabel: "Lekin bu yetarli emas slideri",
                dotsAriaLabel: "Sahifalar navigatsiyasi",
                slideAriaSuffix: "slaydi",
                sourceLabel: "Manba:",
                slides: [
                    {
                        title: "To'liq bloklash",
                        description:
                            "- Bolalar boshqa yo'llarni topishadi\n- Ishonch yo'qoladi\n- Texnologiyadan foydalanishni o'rganmaydi\n- Ijtimoiy ajralishga olib keladi",
                        imageAlt: "To'liq bloklash illyustratsiyasi",
                        hideSource: true,
                        descriptionSize: 16,
                    },
                    {
                        title: "Internetni o'chirish",
                        description:
                            "- Ta'lim uchun zarur resurslar yo'qoladi\n- Zamonaviy dunyo bilan aloqa uziladi\n- Qarshilik va jazo his qilish\n- Amaliy emas",
                        imageAlt: "Internetni o'chirish illyustratsiyasi",
                        hideSource: true,
                        descriptionSize: 16,
                    },
                    {
                        title: "Telefonni olib qo'yish",
                        description:
                            "- Favqulodda vaziyatlarda aloqa yo'q\n- O'z-o'zini boshqarishni o'rgatmaydi\n- Doimiy konflikt\n- Amaliy mustaqillik rivojlanmaydi",
                        imageAlt: "Telefonni olib qo'yish illyustratsiyasi",
                        hideSource: true,
                        descriptionSize: 16,
                    },
                    {
                        title: "Ekstremal choralar natija bermaydi!!!",
                        description:
                            "Biz yangi yondashuvga muhtojmiz - ta'qiq emas, balki to'g'ri nazorat va ta'lim.",
                        descriptionAccent: "balki to'g'ri nazorat va ta'lim.",
                        imageAlt:
                            "Muvozanatli raqamli tarbiya illyustratsiyasi",
                        leftImageAlt: "Chap dekorativ ikonka",
                        rightImageAlt: "O'ng dekorativ ikonka",
                        hideSource: true,
                        cardHeight: 500,
                        cardClassName: "is-not-enough-outro",
                    },
                ],
            },
            howDoesItWork: {
                title: "qanday ishlaydi?",
                titleAccent: "Ilovamiz",
                tabsAriaLabel: "Tikoncha funksiyalari",
                tabs: [
                    {
                        label: "Diqqatni jamlash",
                        step: "01",
                        gifAlt: "Diqqatni jamlash funksiyasi ko'rsatilgan telefon interfeysi",
                        cards: [
                            {
                                label: "MUAMMO",
                                text: "Bola dars qilayotganda telegramdan xabar kelsa yoki o‘yin o‘ynagisi kelsa, darrov chalg‘ib ketadi.",
                                tone: "warning",
                            },
                            {
                                label: "TIKONCHA YECHIMI",
                                text: "'Dars rejimi'ni yoqing. O‘yinlar va ijtimoiy tarmoqlar vaqtincha ishlamay turadi, lekin Wikipedia, Zoom, Lug‘at va dars uchun kerakli ilovalar ochiq qoladi.",
                                tone: "success",
                            },
                            {
                                label: "NATIJA",
                                text: "Chalg‘ituvchi narsalarsiz sifatli bilim olish imkoniyati.",
                                tone: "success",
                            },
                        ],
                    },
                    {
                        label: "Joylashuv va xavfsizlik",
                        step: "02",
                        gifAlt: "Joylashuv va xavfsizlik funksiyasi ko'rsatilgan telefon interfeysi",
                        cards: [
                            {
                                label: "MUAMMO",
                                text: "Farzandim qayerda yuribdi, maktabga yetib bordimi degan doimiy xavotir tinchlik bermaydi.",
                                tone: "warning",
                            },
                            {
                                label: "TIKONCHA YECHIMI",
                                text: "Farzandingiz qayerda ekanligini xaritada kuzatib boring. Maktab yoki uyni belgilab qo‘ysangiz, bola u yerga kirganda yoki chiqqanda sizga avtomatik xabar keladi.",
                                tone: "success",
                            },
                            {
                                label: "NATIJA",
                                text: "Xotirjamlik va to‘liq xavfsizlik.",
                                tone: "success",
                            },
                        ],
                    },
                    {
                        label: "Vaqtni to‘g‘ri boshqarish",
                        step: "03",
                        gifAlt: "Vaqtni boshqarish funksiyasi ko'rsatilgan telefon interfeysi",
                        cards: [
                            {
                                label: "MUAMMO",
                                text: "Telefon oldida vaqt nazoratsiz ketadi, dars va dam olish tartibi buziladi.",
                                tone: "warning",
                            },
                            {
                                label: "TIKONCHA YECHIMI",
                                text: "Har bir ilova uchun kunlik limit va jadval qo‘ying. Belgilangan vaqt tugagach, ilovalar avtomatik cheklanadi.",
                                tone: "success",
                            },
                            {
                                label: "NATIJA",
                                text: "Farzand vaqtni boshqarishni o‘rganadi, ekran vaqti me’yorlashadi.",
                                tone: "success",
                            },
                        ],
                    },
                    {
                        label: "Aniq statistika va nazorat",
                        step: "04",
                        gifAlt: "Aniq statistika va nazorat funksiyasi ko'rsatilgan telefon interfeysi",
                        cards: [
                            {
                                label: "MUAMMO",
                                text: "Ota-ona farzandining telefondan qanday va qancha foydalanayotganini aniq bilmaydi.",
                                tone: "warning",
                            },
                            {
                                label: "TIKONCHA YECHIMI",
                                text: "Kunlik va haftalik hisobotlarda ilovalar, vaqt va faoliyat bo‘yicha aniq statistika ko‘rinadi.",
                                tone: "success",
                            },
                            {
                                label: "NATIJA",
                                text: "Qarorlar taxminga emas, aniq ma’lumotlarga tayangan holda qabul qilinadi.",
                                tone: "success",
                            },
                        ],
                    },
                    {
                        label: "Zararli ilovalardan himoya",
                        step: "05",
                        gifAlt: "Zararli ilovalardan himoya funksiyasi ko'rsatilgan telefon interfeysi",
                        cards: [
                            {
                                label: "MUAMMO",
                                text: "Yoshga mos bo‘lmagan yoki zararli kontentga duch kelish xavfi doim mavjud.",
                                tone: "warning",
                            },
                            {
                                label: "TIKONCHA YECHIMI",
                                text: "Zararli sayt va ilovalarni filtrlang, xavfli kontent ochilishini avtomatik bloklang.",
                                tone: "success",
                            },
                            {
                                label: "NATIJA",
                                text: "Bola uchun xavfsiz va nazorat qilinadigan raqamli muhit yaratiladi.",
                                tone: "success",
                            },
                        ],
                    },
                ],
            },
            aboutTikoncha: {
                title: "Bugun nazoratni boshlang.",
                titleAccent: "Ertaga kech bo'lishi mumkin.",
                description:
                    "Har kechadigan kun - bu farzandingizning ruhiyatiga ta'sir qiluvchi yana bir kun.",
                playMarketLabel: "Play Market",
                appStoreLabel: "App store",
                videoLabel: "Videoni ko'rish",
                imageAlt: "Qalqon ushlagan Tikoncha qahramoni",
            },
        },
    },
    blog: {
        meta: {
            title: "Blog - Tikoncha",
            description: "Yangiliklar va maqolalar.",
        },
        heading: "Blog",
        body: "Bu yerda maqolalar bo'ladi. Keyinchalik MDX yoki content collections bilan to'ldiriladi.",
    },
    account: {
        meta: {
            title: "Account - Tikoncha",
            description: "Account sahifasi tez orada.",
        },
        heading: "Account",
        body: "Account funksiyalari keyinchalik qo'shiladi. Hozircha placeholder.",
    },
    privacy: {
        meta: {
            title: "Privacy Policy - Tikoncha",
            description: "Foydalanuvchi ma'lumotlari va maxfiylik siyosati.",
        },
        heading: "Privacy Policy",
        body: "Bu sahifada maxfiylik siyosati matni joylashadi. Hozircha placeholder.",
    },
    team: {
        meta: {
            title: "Jamoa - Tikoncha",
            description: "Tikoncha jamoasi va mutaxassislarimiz.",
            keywords:
                "tikoncha jamoasi, tikoncha team, tikoncha asoschilari, tikoncha mutaxassislar",
        },
        heading: "Jamoamiz",
        subtitle: "Bizning kuchimiz — birlikda va tajribada.",
    },
};
