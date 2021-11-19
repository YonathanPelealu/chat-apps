export type vendorAttachmentDataType = {
  name: string;
  path: string;
}

export const vendor_attachment_data_init: vendorAttachmentDataType = {
  name: "",
  path: ""
}

export type vendorAttachmentListType = {
  id: string;
  vendor_id: string;
  data: vendorAttachmentDataType;
}

export const vendor_attachment_list_init: vendorAttachmentListType = {
  id: "",
  vendor_id: "",
  data: vendor_attachment_data_init
}