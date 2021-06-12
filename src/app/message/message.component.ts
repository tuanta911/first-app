import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: string[] = this.messageService.messages;

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  close(): void{
    this.router.navigate([{outlets: {popup: null}}]);
    this.messageService.isDisplayed = false;
  }
}
