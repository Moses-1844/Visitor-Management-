import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Visitor } from './visitor';
import { VisitorService } from './visitor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  visitorForm: FormGroup;
  visitor: Visitor;

  constructor(private fb: FormBuilder, private visitorService: VisitorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.visitorForm = this.fb.group({
      name: ['juma', Validators.required],
      idNumber: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      reason: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
  const id = Number(params['id']);
  this.getVisitor(id);
});
  }

 getVisitor(id: number) {
  this.visitorService.getVisitor(id).subscribe(visitor => {
    this.visitor = visitor;
    this.visitorForm.setValue(visitor);
  });
}

  onSubmit() {
    if (this.visitorForm.valid) {
      // Assuming your service has a method to update the visitor data
      this.visitorService.updateVisitor(this.visitorForm.value).subscribe(() => {
        alert('Visitor data updated successfully');
      });
    }
  }
}