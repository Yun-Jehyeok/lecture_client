export type Banner = {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    link?: string;
    displayOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};
