export interface PackageImage {
    url: string;
    public_id: string;
}

export interface PackageData {
    _id: string;
    name: string;
    description: string;
    price: number;
    destination: string;
    image: PackageImage;
    createdAt: string;
    updatedAt: string;
}

export type PackageFormValues = {
    name: string;
    description: string;
    price: number;
    destination: string;
    image: File;
};

export type AllPackages = PackageData[];
