import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { CommonService } from "../services/common.service";

@Injectable({
    providedIn: 'root'
})

export class ImageService {
    constructor(private commonService:CommonService){
    }

    selectedImage?:File
    fd = new FormData();

    insertImage(event:any){
        this.fd = new FormData();  
        this.selectedImage = <File>event.target.files[0];
        this.fd.append('file', this.selectedImage, this.selectedImage.name);
        // this.commonService.postData('/api/images/saveImage',this.fd)?.subscribe(res=>{
        //     alert(res.message);
        //     return true;
        // })
        return this.selectedImage;
    }
}
