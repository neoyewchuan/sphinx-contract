import { Drawing } from './Drawing';
export declare class Furniture {
    build_type: string;
    class_id: string;
    catalog_id: string;
    design_id: string;
    material_id: string;
    material_origin: string;
    length: number;
    width: number;
    height: number;
    seat_height: number;
    back_height: number;
    diagonal_depth: number;
    drawing: Drawing;
    constructor(buildtype: string, classid: string, catalogid: string, designid: string, materialid: string, materialorigin: string, length: number, width: number, height: number, seatheight: number, backheight: number, diagonaldepth: number, drawing: Drawing);
}
