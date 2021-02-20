import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';




@NgModule({
    imports: [
        MatToolbarModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatInputModule,
        MatListModule,
        MatFormFieldModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSelectModule,
        MatGridListModule
    ],
    exports: [
        MatToolbarModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatInputModule,
        MatListModule,
        MatFormFieldModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatDatepickerModule,
        MatSelectModule,
        MatGridListModule
    ]
})

export class MaterialModule {}
