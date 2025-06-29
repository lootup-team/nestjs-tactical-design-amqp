import { DomainEvent, IntegrationEvent } from '@lootupteam/nestjs-tactical-design';
import { Constructor } from '@nestjs/cqrs';

export function toDottedNotation(value: string) {
  const values = [value[0].toLowerCase()];
  for (let i = 1; i < value.length; i++) {
    const thisCharacter = value[i];
    if (['-', '.', '_'].includes(thisCharacter)) {
      values.push('.');
    } else if (thisCharacter === thisCharacter.toUpperCase()) {
      values.push('.', thisCharacter.toLowerCase());
    } else {
      values.push(thisCharacter);
    }
  }
  return values.join('');
}

export function routingKeyOf(
  event: IntegrationEvent | Constructor<IntegrationEvent>,
): string {
  const isInstance =
    event instanceof IntegrationEvent || event instanceof DomainEvent;
  const eventName = isInstance ? event.constructor.name : event.name;
  const baseNameWithoutSuffix = eventName.replace(/Event$/g, '');
  const values = [baseNameWithoutSuffix[0].toLowerCase()];
  for (let i = 1; i < baseNameWithoutSuffix.length; i++) {
    const thisCharacter = baseNameWithoutSuffix[i];
    if (thisCharacter === thisCharacter.toUpperCase()) {
      values.push('.', thisCharacter.toLowerCase());
    } else {
      values.push(thisCharacter);
    }
  }
  return values.join('');
}
