import { z, defineCollection } from "astro:content";

const jegyzokonyvCollection = defineCollection({
    type: "data",
    schema: z.object({
        description: z.string().optional(),
        pdfSrc: z.string(),
        calculationSrc: z.string().optional(),
        taskPdfSrcs: z.array(z.string()).default([]),
    }),
});

export const collections = {
    jegyzokonyv: jegyzokonyvCollection,
};
