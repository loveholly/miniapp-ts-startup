import { BehaviorSubject, Observable } from 'rxjs'

class IndexService {
  private data$ = new BehaviorSubject<string>('')

  get data(): Observable<string> {
    return this.data$.asObservable()
  }

  setData(data: string): void {
    return this.data$.next(data)
  }
}

export const indexService = new IndexService()