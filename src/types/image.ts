import {Link} from './common';

export interface ImageRequest {
  crop_height: number;
  crop_width: number;
  crop_x: number;
  crop_y: number;
  rotation: string;
}

export interface Image extends ImageRequest {
  filename: string;
  height: number;
  id: number;
  links: Array<Link>;
  size: number;
  thumbnail: string;
  thumbnail_hash: string;
  type: string;
  width: number;
}
