import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendRoutingService {

  private baseAddress: string = '';

  /**
   *
   */
  constructor() {
    const loc = new URL(window.location.href);
    const port = (loc.hostname === 'localhost') ? 8080 : loc.port;
    const base = loc.protocol + '//' + loc.hostname + ':' + port + '/';
    this.baseAddress = base;
  }

  /**
   *
   * @param name
   * @param routes
   * @param args
   * @returns
   */
  public getRouteForName(
    name: string,
    routes: Map<string, string>, 
    ...args: any[]): string {

    let path = routes.get(name);
    if (!path) {
      throw new Error(`no route for ${name} found`);
    }

    for(let i = 0; i < args.length; ++i){
      const match=`{${i + 1}}`;
      path = path.replace(match, encodeURIComponent(args[i].toString()));
    }
    return this.baseAddress + path;
  }
}
