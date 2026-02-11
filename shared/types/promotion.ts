export type Promotion = {
    id: string;
    title: string;
    description?: string;
    discountPercent?: number;
    discountAmount?: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};
