import { LocationsModal } from '../models/LocationsModal';
import { ProductModel } from './../models/ProductModel';
import { ReturnUserData } from './../models/ReturnUserData';
import { Uye } from './../models/Uye';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { HttpClient } from '@angular/common/http';



import { collection, collectionData, deleteDoc, doc, docData,getFirestore , Firestore, firestoreInstance$, query, setDoc, where } from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take, } from 'rxjs';
import { addDoc, getDoc, updateDoc } from '@firebase/firestore';


import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  updateProfile,

  UserInfo,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = "https://emlak-portal-783c7-default-rtdb.europe-west1.firebasedatabase.app/";
  public AuthUser = authState(this.auth);
  public ActiveUser = new Uye();

  constructor(
    public http: HttpClient,
    public fs: Firestore,
    public auth: Auth,
    public storage: Storage,

  ) {}

    /* Product Service  */
    GetAllProductData(){
    var ref = collection(this.fs, "products");
    return collectionData(ref, { idField: 'id' }) as Observable<ProductModel[]>;
    }
    GetProductById(id: string){
         const ref = doc(this.fs, "products", id);
        return docData(ref) as Observable<ProductModel>;
    }



    AddProduct(product: ProductModel){
      var ref = collection(this.fs, 'products');
       return addDoc(ref,product);

    }
    EditProduct(product: ProductModel) {
    var ref = doc(this.fs, "products", product.id);
    return from(updateDoc(ref, { ...product }));
    }

    DeleteProduct(product: ProductModel) {
    var ref = doc(this.fs, "products/" + product.id);
    return deleteDoc(ref);
     }
    /* Product Service End */
    /* Locations Service Start */
    ListLocations() {
       var ref = collection(this.fs, "locations");
    return collectionData(ref, { idField: 'id' }) as Observable<LocationsModal[]>;
   }
    LocationById(id: string) {
      var ref = doc(this.fs, 'locations', id);
        return docData(ref) as Observable<LocationsModal>;
    //return this.http.get<LocationsModal>(this.apiUrl + "locations/" + id);
  }
   AddLocation(Location: LocationsModal) {
    var ref = collection(this.fs, 'locations');
       return addDoc(ref,Location);
  }
  EditLocation(Location: LocationsModal) {
     var ref = doc(this.fs, 'locations/'+ Location.id);
       return updateDoc(ref,{...Location});
    //return this.http.put(this.apiUrl + "locations/" + Location.id, location);
  }
   DeleteLocationById(id: string) {
     var ref = doc(this.fs, "locations/" + id);
    return deleteDoc(ref);
    //return this.http.delete(this.apiUrl + "locations/" + id);
  }
    /* Locations Service End */
  /* kategori servis başla*/


  KategoriListele() {
    //return this.http.get<Kategori[]>(this.apiUrl + "categories");
     var ref = collection(this.fs, "categories");
    return collectionData(ref, { idField: 'id' }) as Observable<LocationsModal[]>;
  }
  KategoriById(id: string) {
      var ref = doc(this.fs, 'categories', id);
        return docData(ref) as Observable<Kategori>;

    //return this.http.get<Kategori>(this.apiUrl + "categories/" + id);
  }
  KategoriEkle(kat: Kategori) {
    var ref = collection(this.fs, 'categories');
       return addDoc(ref,kat);
    //return this.http.post(this.apiUrl + "categories/", kat);
  }
  KategoriDuzenle(kat: Kategori) {
      var ref = doc(this.fs, 'categories/'+ kat.id);
       return updateDoc(ref,{...kat});
    //return this.http.put(this.apiUrl + "categories/" + kat.id, kat);
  }
  KategoriSil(id: string) {
     var ref = doc(this.fs, "categories/" + id);
    return deleteDoc(ref);
    //return this.http.delete(this.apiUrl + "categories/" + id);
  }
  /* kategori servis bitiş*/

  /* Uye servis başla*/

  login(mail: string, parola: string) {
    var curUser = this.ReturnUserData;

    curUser.subscribe((user)=>{
      console.log(user);
      this.ActiveUser.admin = user?.admin || 0;
      this.ActiveUser.adsoyad = user?.adsoyad || "John Doe";
      this.ActiveUser.duztarih = user?.duztarih || "0";
      this.ActiveUser.kaytarih = user?.kaytarih || "0";
      this.ActiveUser.id = user?.id || "0";
      localStorage.setItem('adsoyad', user?.adsoyad|| "");
      localStorage.setItem('admin', user?.admin.toString()|| "0")
    })

    return  from(signInWithEmailAndPassword(this.auth, mail, parola));

  }

   OturumKontrol() {
   var user = localStorage.getItem('adsoyad');
   if (user && user != "") {
    return true
   }
   return false
  }

  LogoffUser() {
    localStorage.clear();
    from(this.auth.signOut())
    return true;
  }

  get ReturnUserData() {
    return this.AuthUser.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'users', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }



   Register(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
CheckAdmin(): Observable<boolean> { //this is bane of my existence
  return this.ReturnUserData.pipe(
    map(user => user?.admin === 1)
  );
}

  UyeListele() {
     var ref = collection(this.fs, "users");
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }
  UyeById(id: string) {
     var ref = doc(this.fs, 'users', id);
        return docData(ref) as Observable<Uye>;
   // return this.http.get<Uye>(this.apiUrl + "users/" + id);
  }
  UyeEkle(uye: Uye) {
   var ref = doc(this.fs, 'users', uye.id);
    return from(setDoc(ref, uye));
  }
  UyeDuzenle(uye: Uye) {
      var ref = doc(this.fs, 'users/'+ uye.id);
       return updateDoc(ref,{...uye});
    //return this.http.put(this.apiUrl + "users/" + uye.id, uye);
  }
  UyeSil(id: string) {
      var ref = doc(this.fs, "users/" + id);
    return deleteDoc(ref);
    //return this.http.delete(this.apiUrl + "users/" + id);
  }

  /* Uye servis bitiş*/

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
   updateProfileData(ProfileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if (!user) throw new Error('not authenticated');

        return updateProfile(user, ProfileData);
      })
    )
  }

    async returnProductURL(path:string) {
      const storageRef = ref(this.storage, path);
      return await getDownloadURL(storageRef).then(url=>url);

  }
}
