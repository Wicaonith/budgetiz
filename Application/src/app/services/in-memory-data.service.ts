import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TEST_SECTION } from '../mock/mock-section';

/**
 * Classe qui permet de simuler une API
 */
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    let sections = TEST_SECTION;
    return {sections};
  }
}
