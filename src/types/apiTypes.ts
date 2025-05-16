export interface PackageData {
    _id: number;
    name: string;
    description: string;
    price: number;
    destination: string;
    image: string;
}

export type AllPackages = PackageData[];
