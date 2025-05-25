import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'board/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams(){
      const ids = ['id']
      return ids.map(id => ({ id}) )
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
