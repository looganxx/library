import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { LoginComponent } from './components/login/login.component';
import { ModifyBookComponent } from './components/modify-book/modify-book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserLibraryComponent } from './components/user-library/user-library.component';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'userLibrary', component: UserLibraryComponent},
  { path: 'book/:id', component: BookDetailComponent},
  { path: 'addBook', component: AddBookComponent},
  { path: 'modify/:id', component: ModifyBookComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
