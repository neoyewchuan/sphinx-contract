
import { Object, Property } from 'fabric-contract-api';

//@Object()
export class Drawing {
    //@Property()
    public fileUrl: string; // file URL, actualy file uploaded to IBM object storage, this is the URL to the uploaded file
    public md5: string; // MD5 checksum of file, provide an additional assurance that the file has not been tampered.

    constructor()   {
        this.fileUrl = '';
        this.md5 = '';
    }

    // set theFileUrl(url: string) {
    //     this.fileUrl = url;
    // }

    // set theFileMd5(md5: string) {
    //     this.md5 = md5;
    // }




}
