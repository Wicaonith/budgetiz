import { MatTableDataSource } from "@angular/material/table";

/**
 * 
 */
export interface Family {
    name: string;
    choosenAmount: number;
    annualAmount: number;
    category?: OverviewCategory[] | MatTableDataSource<OverviewCategory>;
}

/**
 * 
 */
export interface OverviewCategory {
    name: string;
    choosenAmount: number;
    annualAmount: number;
    undercategory?: OverviewUndercategory[] | MatTableDataSource<OverviewUndercategory>;
}

/**
 * 
 */
export interface OverviewUndercategory {
    name: string;
    type: string;
    choosenAmount: number;
    annualAmount: number;
}