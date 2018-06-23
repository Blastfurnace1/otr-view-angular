import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const series = [
     {  id: 1,  title: 'Suspense',  logFile: '',  runDates: '1941-1962',  genre: 'Mystery',   episodeCount: 949,  
    country: 'USA',  broadcastOver: 'CBS',  lastUpdate: '6/12/2009',  programLength: '30 mins',  indexed: 1, searchTitle: 'SUSP'},
  {  id: 2,  title: 'Dull',  logFile: '',  runDates: '1941-1962',  genre: 'Mystery',   episodeCount: 949,  
    country: 'USA',  broadcastOver: 'CBS',  lastUpdate: '6/12/2009',  programLength: '30 mins',  indexed: 1, searchTitle: 'SUSP'},
  {  id: 3,  title: 'Boring',  logFile: '',  runDates: '1941-1962',  genre: 'Mystery',   episodeCount: 949,  
    country: 'USA',  broadcastOver: 'CBS',  lastUpdate: '6/12/2009',  programLength: '30 mins',  indexed: 1, searchTitle: 'SUSP'},
  {  id: 4,  title: 'Inconsequential',  logFile: '',  runDates: '1941-1962',  genre: 'Mystery',   episodeCount: 949,  
    country: 'USA',  broadcastOver: 'CBS',  lastUpdate: '6/12/2009',  programLength: '30 mins',  indexed: 1, searchTitle: 'SUSP'},
  {  id: 5,  title: 'Irrelevant',  logFile: '',  runDates: '1941-1962',  genre: 'Mystery',   episodeCount: 949,  
    country: 'USA',  broadcastOver: 'CBS',  lastUpdate: '6/12/2009',  programLength: '30 mins',  indexed: 1, searchTitle: 'SUSP'}
    ];
    return {series};
  }
}

