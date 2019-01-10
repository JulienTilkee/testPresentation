/**
 * Composant utilisé uniquement pour les tests unitaires
 */

 import { Component } from '@angular/core';

@Component({
    selector: 'test.component.ts',
    template: '<div [highlight]="\'blue\'"></div>'
})
export class TestComponent {}
