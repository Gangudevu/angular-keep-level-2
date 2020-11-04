import { Note } from './../note';
import { NotesService } from './../services/notes.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  note: Note = new Note();
  errMessage: string;
    notes: Array<Note> = [];
    constructor(private notesService: NotesService) {}
    // tslint:disable-next-line: use-life-cycle-interface
    ngOnInit (): void {
      this.notesService.getNotes().subscribe(
        data => { if (data) { this.notes = data; } else {
          this.errMessage = 'We are unable to retreive notes';
        }
      }, error => {
        this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
      });
    }
    addNote() {
      if (!this.note.text || !this.note.title) {
        this.errMessage = 'Title and Text both are required fields';
        return;
      }
      this.notesService.addNote(this.note).subscribe(
        data => { if (data) {
          this.notes.push(this.note);
          this.note = new Note();
        } else {
          this.errMessage = 'We are unable to add the selected note.';
        }
      }, error => {
        this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
      });
    }
}
