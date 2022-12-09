import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient} from '@angular/common/http';


declare const $ : any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})
export class MahasiswaComponent implements OnInit, AfterViewInit {
  data: any;
  table1: any;

  constructor(private http : HttpClient, private renderer : Renderer2) { }

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "siderbar-open");
    this.renderer.addClass(document.body, "sidebar-closed");

    this.table1 = $("#table1").DataTable();
    
    this.bind_mahasiswa();
  }


  ngOnInit(): void {
  

}

bind_mahasiswa(): void {
  this.http.get("https://stmikpontianak.net/011100862/tampilMahasiswa.php")
  .subscribe((data: any) => {
    console.log(data);

    data.forEach((element: any) => {
      var tempatTanggalLahir = element.TempatLahir + "," + element.TanggalLahir;
    
      var row =[
        element.NIM,
        element.Nama,
        element.JenisKelamin,
        element.TanggalLahir,
        element.jp,
        element.alamat,
        element.StatusNikah,
        element.TahunMasuk,
      ]    

      this.table1.row.add(row);
    });
    
    this.table1.draw(false);

  })
}

}