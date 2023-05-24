import { connect } from "react-redux";
import { RootState, TypedDispatch } from "../../../../redux/store";
import MasterMaterial from "../component/material";
import {
  fetchAllMaterial,
  fetchCreateMaterial,
  fetchStatusChangeMaterial,
  fetchUpdateMaterial,
} from "../service/materialSlice";
import {
  CREATEMATERIALDT,
  MATERIALTBLDT,
  UPDATEMATERIALDT,
} from "../service/types";
import { RoleFunDTO } from "pages/auth/signin/service/types";
import { getRole } from "pages/auth/signin/service/userSlice";

interface StateProps {
  error_getMaterial: string | boolean | undefined;
  loading_getMaterial: boolean;
  success_getMaterial: boolean;

  error_createMaterial: string | boolean | undefined;
  loading_createMaterial: boolean;
  success_createMaterial: boolean;

  loading_updateMaterial: string | boolean | undefined;
  error_updateMaterial: string | boolean | undefined;
  success_updateMaterial: boolean;

  loading_statusMaterial: boolean;
  success_statusMaterial: boolean;
  error_statusMaterial: string | boolean | undefined;

  materialList: MATERIALTBLDT[] | null;
  role_function: RoleFunDTO | undefined
}

interface DispatchProps {
  getAllMaterials(): void;
  createMaterial(data: CREATEMATERIALDT): void;
  updateMaterial(data: UPDATEMATERIALDT): void;
  statusChangeMaterial(data: UPDATEMATERIALDT): void;
  getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    error_getMaterial: state.material.error_getMaterial,
    loading_getMaterial: state.material.loading_getMaterial,
    success_getMaterial: state.material.success_getMaterial,

    materialList: state.material.materialList,

    loading_createMaterial: state.material.loading_createMaterial,
    error_createMaterial: state.material.error_createMaterial,
    success_createMaterial: state.material.success_createMaterial,

    loading_updateMaterial: state.material.loading_updateMaterial,
    error_updateMaterial: state.material.error_updateMaterial,
    success_updateMaterial: state.material.success_updateMaterial,

    loading_statusMaterial: state.material.loading_statusMaterial,
    success_statusMaterial: state.material.success_statusMaterial,
    error_statusMaterial: state.material.error_statusMaterial,
    role_function: state.userLogin.role_function
  };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getAllMaterials: () => {
      dispatch(fetchAllMaterial());
    },
    createMaterial: (data) => {
      dispatch(fetchCreateMaterial(data));
    },
    updateMaterial: (data) => {
      dispatch(fetchUpdateMaterial(data));
    },
    statusChangeMaterial: (data) => {
      dispatch(fetchStatusChangeMaterial(data));
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  };
};

export interface MaterialProps extends StateProps, DispatchProps {}
export const MaterialComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterMaterial);
