interface Missions {
  name: string;
  flight: number;
}

export interface Capsule {
  capsule_serial: string;
  capsule_id: string;
  status: string;
  original_launch: string;
  missions: Missions[];
  landings: number;
  type: string;
  details: string;
  reuse_count: number;
}
