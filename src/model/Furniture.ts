import { Object, Property } from 'fabric-contract-api';
import { Drawing } from './Drawing';

//@Object()
export class Furniture {

    //@Property()
    public build_type: string;   // 'custom', 'design', 'ready'
    public class_id: string;     // 'table','cupboard',etc
    public catalog_id: string;   // applicable to buildType of 'ready'
    public design_id: string;    // applicable to buildType of 'design'
    public material_id: string;  // 'WRT010',
    public material_origin: string; // country and forest where the material was harvested
    public length: number;      // length of furniture
    public width: number;       // width of furniture
    public height: number;      // height of furniture
    public seat_height: number;  // the seat height, applicable to sofa/chair
    public back_height: number;  // the back height, applicable to sofa/chair
    public diagonal_depth: number;   // the diagonal depth, will determine the angle between the seat and back rest, applicable to sofa/chair
    public drawing: Drawing;    // drawing of furniture from customer

    constructor(buildtype: string, classid: string, catalogid: string, designid: string, materialid: string,
        materialorigin: string, length: number, width: number, height: number, seatheight: number, backheight: number,
        diagonaldepth: number, drawing: Drawing)    {
        this.build_type = buildtype;
        this.class_id = classid;
        this.catalog_id = catalogid;
        this.design_id = designid;
        this.material_id = materialid;
        this.material_origin = materialorigin;
        this.length = length;
        this.width = width;
        this.height = height;
        this.seat_height = seatheight;
        this.back_height = backheight;
        this.diagonal_depth = diagonaldepth;
        this.drawing = drawing;
    }
}
