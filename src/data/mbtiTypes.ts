import type { MBTIProfile, MBTIType } from '../types';
import { mbtiCards } from './mbtiCards';

type ProfileText = Omit<MBTIProfile, 'code' | 'cardAsset'>;
const profiles: Record<MBTIType, ProfileText> = {
  INTJ: {
    title: 'Sang Arsitek', group: 'Analis', shortDescription: 'Perancang visi dengan langkah yang terarah.',
    description: 'Kamu cenderung menikmati pemikiran mendalam, pola yang masuk akal, dan rencana jangka panjang. Kemandirian memberi ruang untuk mengembangkan gagasan sebelum membagikannya. Kamu sering mencari cara agar sesuatu bekerja lebih baik.',
    traits: ['Visioner', 'Mandiri', 'Strategis', 'Tekun'], strengths: ['Melihat hubungan dan arah jangka panjang.', 'Menyusun rencana untuk masalah yang rumit.', 'Konsisten mengembangkan kemampuan.'], challenges: ['Memberi ruang untuk kebutuhan emosional orang lain.', 'Menerima proses yang tidak selalu efisien.', 'Menguji standar tinggi dengan keadaan nyata.'],
    communication: 'Langsung, terstruktur, dan berorientasi gagasan. Beri konteks agar maksud baikmu mudah dipahami.', environment: 'Ruang mandiri dengan tujuan jelas, kesempatan berpikir, dan kebebasan memperbaiki sistem.', relationships: 'Kamu cenderung menunjukkan perhatian melalui komitmen dan bantuan nyata. Menyampaikan apresiasi secara terbuka dapat mempererat hubungan.',
  },
  INTP: {
    title: 'Sang Logikawan', group: 'Analis', shortDescription: 'Penjelajah gagasan dengan rasa ingin tahu yang luas.',
    description: 'Kamu cenderung penasaran pada cara kerja sesuatu dan senang menguji penjelasan dari banyak sudut. Memahami sebuah konsep bisa sama menariknya dengan menemukan jawaban. Ruang untuk bereksperimen membantu idemu tumbuh.',
    traits: ['Analitis', 'Penasaran', 'Terbuka', 'Imajinatif'], strengths: ['Mengurai persoalan menjadi bagian yang masuk akal.', 'Menemukan kemungkinan yang belum terpikirkan.', 'Mempertanyakan asumsi secara kritis.'], challenges: ['Mengubah gagasan menjadi langkah selesai.', 'Menjelaskan alur berpikir tanpa melewatkan konteks.', 'Menyeimbangkan analisis dengan kebutuhan sehari-hari.'],
    communication: 'Eksploratif dan penuh pertanyaan. Menghubungkan ide dengan contoh membantu orang lain mengikuti pemikiranmu.', environment: 'Suasana fleksibel yang menghargai rasa ingin tahu dan waktu berkonsentrasi.', relationships: 'Rasa ingin tahu dan percakapan mendalam dapat menjadi bentuk kedekatanmu. Sisihkan waktu untuk mendengarkan perasaan tanpa langsung mencari solusi.',
  },
  ENTJ: {
    title: 'Sang Komandan', group: 'Analis', shortDescription: 'Penggerak arah dan penghubung potensi.',
    description: 'Kamu cenderung nyaman menentukan tujuan, menata sumber daya, dan mengajak orang bergerak. Tantangan memberi dorongan untuk menyusun strategi. Kamu menghargai kemajuan yang jelas dan kesediaan untuk bertanggung jawab.',
    traits: ['Tegas', 'Strategis', 'Berinisiatif', 'Terarah'], strengths: ['Mengubah visi menjadi sasaran yang konkret.', 'Mengambil keputusan saat situasi menuntut.', 'Mendorong kolaborasi menuju tujuan.'], challenges: ['Memberi waktu bagi ritme orang lain.', 'Mendengar masukan sebelum mengambil kendali.', 'Menyeimbangkan pencapaian dan pemulihan energi.'],
    communication: 'Jelas dan berorientasi tindakan. Pertanyaan terbuka membantu memberi ruang bagi sudut pandang lain.', environment: 'Tujuan menantang, tanggung jawab jelas, dan tim yang terbuka pada perbaikan.', relationships: 'Kamu dapat mengekspresikan perhatian dengan membantu orang berkembang. Dukungan akan terasa lebih hangat bila disertai penerimaan tanpa tuntutan.',
  },
  ENTP: {
    title: 'Sang Pendebat', group: 'Analis', shortDescription: 'Pemantik kemungkinan dan sudut pandang baru.',
    description: 'Kamu cenderung menikmati pertukaran ide dan kemungkinan yang belum teruji. Perbedaan pandangan bisa menjadi undangan untuk bereksperimen. Kebaruan dan kebebasan berpikir sering memicu semangatmu.',
    traits: ['Inventif', 'Luwes', 'Ekspresif', 'Kritis'], strengths: ['Menghasilkan alternatif dengan cepat.', 'Melihat persoalan dari sudut yang tidak biasa.', 'Beradaptasi saat rencana berubah.'], challenges: ['Menuntaskan pekerjaan setelah antusiasme awal.', 'Membedakan diskusi ide dan kebutuhan dukungan.', 'Menjaga konsistensi dalam komitmen kecil.'],
    communication: 'Spontan, argumentatif, dan penuh kemungkinan. Pastikan lawan bicara nyaman dengan gaya diskusimu.', environment: 'Ruang kolaboratif untuk mencoba ide baru dengan batas tujuan yang cukup jelas.', relationships: 'Kamu membawa rasa penasaran dan kesegaran dalam hubungan. Kehadiran yang konsisten sama berharganya dengan percakapan seru.',
  },
  INFJ: {
    title: 'Sang Advokat', group: 'Diplomat', shortDescription: 'Penjaga makna dengan visi yang tenang.',
    description: 'Kamu cenderung mencari makna di balik pengalaman dan memperhatikan kebutuhan orang lain. Nilai pribadi serta gambaran masa depan dapat menjadi penuntun. Waktu hening membantu menyatukan pemikiran sebelum bertindak.',
    traits: ['Reflektif', 'Empatik', 'Idealis', 'Terarah'], strengths: ['Mendengarkan dengan perhatian mendalam.', 'Menghubungkan nilai dengan tujuan jangka panjang.', 'Melihat pola dalam pengalaman manusia.'], challenges: ['Menyampaikan kebutuhan dan batas pribadi.', 'Memberi ruang bagi hasil yang belum sempurna.', 'Memeriksa dugaan tentang perasaan orang lain.'],
    communication: 'Mendalam dan penuh pertimbangan. Percakapan yang tenang membantu gagasan dan perasaan tersampaikan.', environment: 'Suasana yang menghargai integritas, konsentrasi, dan kontribusi yang bermakna.', relationships: 'Kedekatan yang tulus sering lebih berarti daripada lingkaran yang luas. Kejelasan kebutuhan dan batas membantu menjaga hubungan tetap seimbang.',
  },
  INFP: {
    title: 'Sang Mediator', group: 'Diplomat', shortDescription: 'Perawat kemungkinan yang setia pada nilai.',
    description: 'Kamu cenderung menghargai keaslian, imajinasi, dan kebebasan menjadi diri sendiri. Pengalaman pribadi dapat memantik gagasan kreatif. Kamu sering ingin pilihanmu selaras dengan hal yang benar-benar bermakna bagimu.',
    traits: ['Imajinatif', 'Tulus', 'Peka', 'Idealis'], strengths: ['Memahami pengalaman dari sudut orang lain.', 'Mengekspresikan gagasan dengan kreatif.', 'Menjaga nilai di tengah tekanan.'], challenges: ['Menerjemahkan harapan menjadi langkah praktis.', 'Menyampaikan ketidaksetujuan secara terbuka.', 'Menerima umpan balik tanpa menilai seluruh diri.'],
    communication: 'Personal dan reflektif. Waktu untuk merangkai pikiran membantu menyampaikan hal yang penting.', environment: 'Suasana suportif dengan ruang kreatif, otonomi, dan tujuan yang terasa bermakna.', relationships: 'Kamu menghargai penerimaan dan kedalaman. Mengungkapkan ekspektasi secara jelas membantu orang lain memahami cara mendukungmu.',
  },
  ENFJ: {
    title: 'Sang Protagonis', group: 'Diplomat', shortDescription: 'Penghubung manusia dan penggerak harapan.',
    description: 'Kamu cenderung memperhatikan dinamika kelompok dan potensi orang di sekitarmu. Tujuan bersama terasa hidup ketika semua orang bisa berkontribusi. Kamu sering terdorong membantu orang tumbuh dengan arahan yang hangat.',
    traits: ['Hangat', 'Inspiratif', 'Terorganisir', 'Peduli'], strengths: ['Membangun rasa kebersamaan.', 'Mendorong orang mengenali potensinya.', 'Mengomunikasikan visi yang bermakna.'], challenges: ['Tidak mengambil semua kebutuhan orang sebagai tanggung jawab.', 'Menghadapi perbedaan tanpa selalu mencari kesepakatan.', 'Memberi ruang pada kebutuhan sendiri.'],
    communication: 'Hangat dan mengajak. Mendengarkan tanpa mengarahkan kadang menjadi dukungan terbaik.', environment: 'Tim yang saling mendukung dengan tujuan bersama dan komunikasi terbuka.', relationships: 'Kamu cenderung hadir dengan perhatian dan dorongan. Hubungan yang sehat juga menyediakan ruang untuk menerima bantuan.',
  },
  ENFP: {
    title: 'Sang Juru Kampanye', group: 'Diplomat', shortDescription: 'Pembawa semangat dan penjelajah kemungkinan.',
    description: 'Kamu cenderung tertarik pada orang, cerita, dan ide baru. Antusiasme membantu menghubungkan kemungkinan dengan hal yang kamu pedulikan. Kamu menghargai kebebasan untuk bertumbuh dan menemukan arah yang terasa autentik.',
    traits: ['Antusias', 'Kreatif', 'Ramah', 'Luwes'], strengths: ['Membangkitkan semangat orang lain.', 'Melihat potensi dalam situasi baru.', 'Membangun koneksi melalui rasa ingin tahu.'], challenges: ['Memilih prioritas di antara banyak ide.', 'Menjaga energi dan komitmen tetap seimbang.', 'Menyelesaikan detail setelah tahap eksplorasi.'],
    communication: 'Ekspresif, spontan, dan beragam. Merangkum inti pesan membantu ide lebih mudah ditindaklanjuti.', environment: 'Suasana dinamis, terbuka, dan memberi ruang untuk kolaborasi kreatif.', relationships: 'Kamu membawa kehangatan dan kebaruan. Kebiasaan kecil yang konsisten membantu kedekatan bertahan di tengah banyak kegiatan.',
  },
  ISTJ: {
    title: 'Sang Logistikawan', group: 'Pengawal', shortDescription: 'Penjaga ketelitian dan komitmen.',
    description: 'Kamu cenderung mengandalkan fakta, pengalaman, dan langkah yang tertata. Kejelasan tanggung jawab membuatmu nyaman bekerja. Kamu menghargai janji yang ditepati dan hasil yang dapat diandalkan.',
    traits: ['Teliti', 'Konsisten', 'Praktis', 'Bertanggung jawab'], strengths: ['Menjaga kualitas melalui perhatian pada detail.', 'Menuntaskan tugas secara konsisten.', 'Membuat proses yang dapat diandalkan.'], challenges: ['Memberi kesempatan pada metode yang belum teruji.', 'Menyesuaikan diri saat rencana berubah.', 'Mengungkapkan apresiasi dan kebutuhan emosional.'],
    communication: 'Ringkas, faktual, dan teratur. Menjelaskan alasan di balik aturan membantu membangun pemahaman.', environment: 'Ekspektasi yang jelas, proses teratur, dan ruang untuk bekerja dengan cermat.', relationships: 'Perhatianmu sering tampak dalam tindakan yang konsisten. Kata-kata hangat dapat melengkapi dukungan praktis tersebut.',
  },
  ISFJ: {
    title: 'Sang Pembela', group: 'Pengawal', shortDescription: 'Pelindung yang hadir melalui perhatian kecil.',
    description: 'Kamu cenderung memperhatikan kebutuhan konkret dan kenyamanan orang lain. Pengalaman serta hubungan yang dipercaya menjadi pegangan. Kontribusimu sering hadir melalui tindakan tenang yang membuat kehidupan terasa lebih aman.',
    traits: ['Perhatian', 'Sabar', 'Teliti', 'Setia'], strengths: ['Mengingat detail yang berarti bagi orang lain.', 'Memberi bantuan yang praktis.', 'Menjaga kontinuitas dan rasa aman.'], challenges: ['Mengatakan tidak ketika kapasitas terbatas.', 'Menghadapi perubahan secara bertahap.', 'Meminta penghargaan atau bantuan saat dibutuhkan.'],
    communication: 'Lembut, konkret, dan penuh perhatian. Menyampaikan kebutuhan secara langsung menjaga keseimbangan.', environment: 'Suasana stabil, saling menghormati, dan menghargai kontribusi yang konsisten.', relationships: 'Kamu membangun kepercayaan melalui kepedulian sehari-hari. Hubungan yang timbal balik memberi ruang untuk dirimu juga.',
  },
  ESTJ: {
    title: 'Sang Eksekutif', group: 'Pengawal', shortDescription: 'Penata langkah yang membawa rencana menjadi nyata.',
    description: 'Kamu cenderung menyukai kejelasan, tanggung jawab, dan tindakan yang terukur. Kamu nyaman mengatur pekerjaan agar berjalan lancar. Pengalaman praktis membantu menilai apa yang bisa segera dilakukan.',
    traits: ['Terorganisir', 'Tegas', 'Praktis', 'Konsisten'], strengths: ['Mengatur sumber daya dengan efektif.', 'Menjaga tim tetap bergerak.', 'Memperjelas standar dan tanggung jawab.'], challenges: ['Mendengar kebutuhan yang tidak mudah diukur.', 'Memberi ruang pada cara kerja berbeda.', 'Meninjau kembali aturan ketika konteks berubah.'],
    communication: 'Langsung dan jelas. Menanyakan pertimbangan orang lain membantu keputusan lebih inklusif.', environment: 'Tim dengan pembagian peran, sasaran konkret, dan tanggung jawab yang adil.', relationships: 'Kamu menunjukkan komitmen lewat keandalan. Fleksibilitas dan apresiasi memperkaya hubungan di luar urusan praktis.',
  },
  ESFJ: {
    title: 'Sang Konsul', group: 'Pengawal', shortDescription: 'Perawat kebersamaan dan kehangatan sehari-hari.',
    description: 'Kamu cenderung memperhatikan suasana sosial dan senang memastikan orang merasa dilibatkan. Kebiasaan bersama serta bantuan konkret menjadi cara membangun kedekatan. Kamu menghargai kerja sama yang hangat dan saling mendukung.',
    traits: ['Ramah', 'Peduli', 'Kooperatif', 'Teratur'], strengths: ['Menciptakan suasana yang menyambut.', 'Menghubungkan kebutuhan dengan bantuan nyata.', 'Menjaga kegiatan bersama tetap tertata.'], challenges: ['Tidak menggantungkan nilai diri pada persetujuan orang.', 'Memberi ruang pada perbedaan gaya hidup.', 'Menjaga batas ketika banyak orang membutuhkan bantuan.'],
    communication: 'Hangat dan personal. Pertanyaan terbuka memberi ruang untuk kebutuhan yang berbeda dari dugaanmu.', environment: 'Komunitas kooperatif dengan hubungan yang saling menghargai dan tujuan yang konkret.', relationships: 'Kamu menumbuhkan kedekatan melalui perhatian rutin. Menghargai cara berbeda dalam menunjukkan kasih membantu hubungan berkembang.',
  },
  ISTP: {
    title: 'Sang Virtuoso', group: 'Penjelajah', shortDescription: 'Pemecah masalah yang belajar melalui tindakan.',
    description: 'Kamu cenderung penasaran pada cara kerja benda dan situasi nyata. Kebebasan mengamati, mencoba, lalu menyesuaikan pendekatan terasa alami. Kamu sering menemukan solusi praktis tanpa perlu banyak penjelasan.',
    traits: ['Praktis', 'Mandiri', 'Tenang', 'Adaptif'], strengths: ['Memecahkan persoalan konkret.', 'Tetap tenang saat harus bereaksi cepat.', 'Belajar melalui eksperimen langsung.'], challenges: ['Menjelaskan rencana kepada orang yang bergantung padamu.', 'Menjaga komitmen jangka panjang.', 'Memberi ruang pada percakapan emosional.'],
    communication: 'Singkat dan langsung pada persoalan. Berbagi proses berpikir membantu kolaborasi.', environment: 'Ruang otonom dengan tantangan nyata, alat yang memadai, dan kesempatan mencoba.', relationships: 'Kamu cenderung menghargai ruang pribadi dan pengalaman bersama. Menyatakan perhatian membantu orang lain mengenali dukunganmu.',
  },
  ISFP: {
    title: 'Sang Petualang', group: 'Penjelajah', shortDescription: 'Penikmat pengalaman yang setia pada rasa.',
    description: 'Kamu cenderung peka terhadap suasana, keindahan, dan pengalaman yang terasa personal. Kamu menyukai ruang untuk bertindak sesuai nilai sendiri. Kreativitas dapat muncul lewat cara sederhana dalam menjalani keseharian.',
    traits: ['Peka', 'Autentik', 'Luwes', 'Kreatif'], strengths: ['Memperhatikan detail pengalaman saat ini.', 'Membawa kepekaan dalam tindakan.', 'Menemukan ekspresi yang personal.'], challenges: ['Menyampaikan batas sebelum merasa kewalahan.', 'Merencanakan kebutuhan jangka panjang.', 'Menghadapi konflik tanpa menarik diri sepenuhnya.'],
    communication: 'Personal dan bersahaja. Contoh atau pengalaman bersama membantu menyampaikan perasaan.', environment: 'Suasana fleksibel, tidak menghakimi, dan memberi ruang untuk ekspresi pribadi.', relationships: 'Kamu dapat menunjukkan kedekatan melalui kehadiran dan tindakan kecil. Percakapan yang jujur memperjelas hal yang kamu butuhkan.',
  },
  ESFP: {
    title: 'Sang Penghibur', group: 'Penjelajah', shortDescription: 'Pembawa kehangatan dalam pengalaman bersama.',
    description: 'Kamu cenderung hadir penuh dalam momen dan mudah terhubung dengan orang di sekitar. Pengalaman langsung memberi energi serta inspirasi. Kamu menikmati kesempatan membuat suasana terasa lebih hidup.',
    traits: ['Ekspresif', 'Hangat', 'Spontan', 'Praktis'], strengths: ['Mencairkan suasana dan melibatkan orang.', 'Menanggapi kebutuhan saat ini.', 'Beradaptasi melalui pengalaman langsung.'], challenges: ['Menyisihkan waktu untuk rencana jangka panjang.', 'Menghadapi percakapan sulit dengan tenang.', 'Menyeimbangkan spontanitas dan komitmen.'],
    communication: 'Hidup, hangat, dan konkret. Jeda untuk mendengar membantu orang yang lebih tenang ikut terlibat.', environment: 'Suasana interaktif dengan variasi kegiatan dan umpan balik yang langsung.', relationships: 'Kamu menghadirkan kegembiraan dan perhatian spontan. Konsistensi memberi rasa aman di samping pengalaman menyenangkan.',
  },
  ESTP: {
    title: 'Sang Pengusaha', group: 'Penjelajah', shortDescription: 'Pengambil inisiatif yang sigap membaca situasi.',
    description: 'Kamu cenderung cepat mengenali peluang dan ingin mencoba solusi secara langsung. Tantangan nyata bisa membangkitkan semangatmu. Kamu nyaman menyesuaikan langkah berdasarkan apa yang terjadi di lapangan.',
    traits: ['Sigap', 'Berani', 'Praktis', 'Adaptif'], strengths: ['Membaca situasi dan mengambil tindakan.', 'Bernegosiasi secara fleksibel.', 'Mencari solusi dalam tekanan.'], challenges: ['Memikirkan dampak pilihan jangka panjang.', 'Memberi ruang pada pertimbangan yang lebih lambat.', 'Mengenali kebutuhan emosional yang tidak diucapkan.'],
    communication: 'Langsung, energik, dan konkret. Memastikan semua pihak didengar membantu keputusan bersama.', environment: 'Suasana dinamis dengan kebebasan bertindak, tantangan nyata, dan batas yang jelas.', relationships: 'Pengalaman bersama dapat menjadi jalan kedekatanmu. Percakapan reflektif membantu hubungan melampaui aktivitas sehari-hari.',
  },
};

export const mbtiTypes = Object.fromEntries(Object.entries(profiles).map(([code, profile]) => [code, {
  ...profile, code, cardAsset: mbtiCards[code as MBTIType],
}])) as Record<MBTIType, MBTIProfile>;
export const groupClass = { Analis: 'analyst', Diplomat: 'diplomat', Pengawal: 'sentinel', Penjelajah: 'explorer' } as const;
