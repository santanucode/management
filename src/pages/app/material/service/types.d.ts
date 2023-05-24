export interface CREATEMATERIALDT {
  name: string;
  code: string;
  BCNHL_bonus: number;
}

export interface MATERIALTBLDT {
  id?: number;
  name?: string;
  code?: string;
  BCNHL_bonus?: number;
  is_active?: any;
}

export interface UPDATEMATERIALDT {
  id: number;
  material: MATERIALTBLDT;
}

export interface INITSTATEDT {
  loading_getMaterial: boolean;
  success_getMaterial: boolean;
  error_getMaterial: string | boolean | undefined;

  loading_createMaterial: boolean;
  success_createMaterial: boolean;
  error_createMaterial: string | boolean | undefined;

  loading_updateMaterial: boolean;
  success_updateMaterial: boolean;
  error_updateMaterial: string | boolean | undefined;

  loading_statusMaterial: boolean;
  success_statusMaterial: boolean;
  error_statusMaterial: string | boolean | undefined;

  materialList: MATERIALTBLDT[] | null;
}
