import placeholderImage from "@assets/images/placeholder255x255.png";
import { Card, CardContent, TextField } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { FormChange } from "@saleor/hooks/useForm";
import React from "react";
import { useIntl } from "react-intl";

import StoreMedia from "../StoreMedia";

interface IProps {
  header: string;
  handleChange: FormChange;
  values: Partial<any>;
  storeId?: any;
}

function StoreInput({
  header,
  values,
  handleChange,
  storeId,
  ...formikProps
}: IProps) {
  const intl = useIntl();
  const { errors, touched, handleBlur, setFieldValue }: any = formikProps;
  const [imagesToUpload, setImagesToUpload] = React.useState<any>({
    logo: [],
    coverPhoto: []
  });

  // React.useEffect(() => {
  //   if (values.name) {
  //     console.log(values, "--balue");

  //     setImagesToUpload({
  //       logo: [values.logo],
  //       coverPhoto: [values.coverPhoto]
  //     });
  //   }
  // }, [values]);

  const [tempImgDelete, setTempImgDelete] = React.useState({
    logo: [],
    coverPhoto: []
  });

  const handleImageDelete = (id?: string, title?: string) => () => {
    if (title === "Logo") {
      tempImgDelete.logo.push(id);
      setTempImgDelete({ ...tempImgDelete });
      const index = imagesToUpload.logo.findIndex(e => e.id === id);
      if (index !== -1) {
        imagesToUpload.logo.splice(index, 1);
        setImagesToUpload({ ...imagesToUpload });
      }
    } else {
      tempImgDelete.coverPhoto.push(id);
      setTempImgDelete({ ...tempImgDelete });
      const index = imagesToUpload.coverPhoto.findIndex(e => e.id === id);
      if (index !== -1) {
        imagesToUpload.coverPhoto.splice(index, 1);
        setImagesToUpload({ ...imagesToUpload });
      }
    }
  };

  React.useEffect(() => {
    if (storeId) {
      if (imagesToUpload.logo.length > 0) {
        setFieldValue("logo", imagesToUpload?.logo);
      }
      if (imagesToUpload.coverPhoto.length > 0) {
        setFieldValue("coverPhoto", imagesToUpload?.coverPhoto);
      }
    }
  }, [imagesToUpload]);

  return (
    <Card>
      <CardTitle title={header} />
      <CardContent>
        <>
          <TextField
            label={intl.formatMessage({
              defaultMessage: "Store Name*"
            })}
            fullWidth
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name && touched.name}
            helperText={errors.name && touched.name && errors.name}
          />
          <FormSpacer />
          <TextField
            label={intl.formatMessage({
              defaultMessage: "Domain*"
            })}
            fullWidth
            name="domain"
            value={values.domain}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.domain && touched.domain}
            helperText={errors.domain && touched.domain && errors.domain}
          />
          <FormSpacer />
          {storeId ? (
            <>
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Address"
                })}
                fullWidth
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address && touched.address}
                helperText={errors.address && touched.address && errors.address}
              />
              <FormSpacer />
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Phone"
                })}
                fullWidth
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone && touched.phone}
                helperText={errors.phone && touched.phone && errors.phone}
              />
              <FormSpacer />
              <StoreMedia
                title="Logo"
                placeholderImage={placeholderImage}
                imagesToUpload={values.logo}
                setImagesToUpload={setImagesToUpload}
                carousel={values.logo}
                onImageDelete={handleImageDelete}
              />
              <StoreMedia
                title="Cover Photo"
                placeholderImage={placeholderImage}
                imagesToUpload={values.coverPhoto}
                setImagesToUpload={setImagesToUpload}
                carousel={values.coverPhoto}
                onImageDelete={handleImageDelete}
              />
            </>
          ) : (
            <>
              <TextField
                label={intl.formatMessage({
                  defaultMessage: "Email*"
                })}
                fullWidth
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
              <FormSpacer />

              <TextField
                label={intl.formatMessage({
                  defaultMessage: "password*"
                })}
                fullWidth
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
            </>
          )}

          <FormSpacer />
          <FormSpacer />
        </>
      </CardContent>
    </Card>
  );
}

export default StoreInput;
