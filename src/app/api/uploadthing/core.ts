import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
  // farklı yükleme türleri için rotaları tanımla
  postImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // bu kod yüklemeden önce sunucunuzda çalışır
      const { userId } = await auth();
      if (!userId) throw new Error("Yetkisiz");

      // Burada döndürülen her şeye onUploadComplete'te `metadata` olarak erişilebilir
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        return { fileUrl: file.ufsUrl };
      } catch (error) {
        console.error("onUploadComplete'te hata:", error);
        throw error;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;