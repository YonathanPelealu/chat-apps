export type categoryListType = {
  id: string;
  company_id: string;
  data: {
    name: string
  }
}

export const category_list_init: categoryListType = {
  id: "",
  company_id: "",
  data: {
    name: ""
  }
}

export type typeListType = {
  id: string;
  asset_category_id: string;
  data: {
    name: string
  };
}

export const type_list_init: typeListType = {
  id: "",
  asset_category_id: "",
  data: {
    name: ""
  }
}