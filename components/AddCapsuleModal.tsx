import { Capsule } from "@/types/capsule";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import * as Yup from "yup";

const AddCapsuleModal = ({
  onAdd,
  onClose,
}: {
  onAdd: (capsule: Capsule) => void;
  onClose: () => void;
}) => {
  const validationSchema = Yup.object().shape({
    capsule_serial: Yup.string().required("Capsule serial is required"),
    capsule_id: Yup.string().required("Capsule status is required"),
    status: Yup.string().required("Capsule launch date is required"),
    original_launch: Yup.date().required("Capsule land date is required"),
    type: Yup.string().required("Capsule reuse count is required"),
    details: Yup.string().required("Capsule type is required"),
    landings: Yup.number().required("Capsule landings is required"),
    reuse_count: Yup.number().required("Capsule reuse count is required"),
    missions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .nullable()
          .notRequired()
          .test(
            "name-flight-required",
            "Mission name is required if flight is provided",
            function (value) {
              const { flight } = this.parent;
              if (flight && !value) {
                return false;
              }
              return true;
            }
          ),
        flight: Yup.number()
          .nullable()
          .notRequired()
          .test(
            "flight-name-required",
            "Flight number is required if mission name is provided",
            function (value) {
              const { name } = this.parent;
              if (name && !value) {
                return false;
              }
              return true;
            }
          ),
      })
    ),
  });

  const initialValues: Capsule = {
    capsule_serial: "",
    capsule_id: "",
    status: "",
    original_launch: "",
    type: "",
    details: "",
    landings: 0,
    reuse_count: 0,
    missions: [],
  };

  const handleSubmit = (values: Capsule) => {
    const newCapsule: Capsule = {
      ...values,
    };

    onAdd(newCapsule);
    console.log("submitting capsule");
  };

  return (
    <section className="bg-black/20 w-screen h-full absolute top-0 left-0 flex items-center justify-center">
      <div className="contain w-full">
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl my-10 mx-auto w-full max-w-3xl p-10">
          <header className="flex flex-wrap items-center justify-between gap-4 w-full border-b border-brand_primary-50 py-3 mb-5">
            <h3 className="text-2xl font-medium">Add New Capsule</h3>
            <FaXmark className="text-2xl cursor-pointer" onClick={onClose} />
          </header>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="w-full">
                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Capsule Serial
                    </label>
                    <Field
                      name="capsule_serial"
                      placeholder="Capsule Serial"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="capsule_serial"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Capsule ID
                    </label>
                    <Field
                      name="capsule_id"
                      placeholder="Capsule ID"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="capsule_id"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Status
                    </label>
                    <Field
                      name="status"
                      placeholder="Status"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Original Launch
                    </label>
                    <Field
                      name="original_launch"
                      placeholder="Original Launch"
                      type="date"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="original_launch"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Type
                    </label>
                    <Field
                      name="type"
                      placeholder="Type"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Details
                    </label>
                    <Field
                      name="details"
                      placeholder="Details"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="details"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Landings
                    </label>
                    <Field
                      name="landings"
                      type="number"
                      placeholder="Landings"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="landings"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Reuse Count
                    </label>
                    <Field
                      name="reuse_count"
                      type="number"
                      placeholder="Reuse Count"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="reuse_count"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <FieldArray name="missions">
                    {({ push, remove }) => (
                      <div>
                        {values.missions.map((_, index) => (
                          <div
                            key={index}
                            className="flex flex-wrap gap-4 mb-3"
                          >
                            <div className="flex flex-col flex-1">
                              <label className="text-sm font-bold mb-2">
                                Mission Name
                              </label>
                              <Field
                                name={`missions.${index}.name`}
                                placeholder="Mission Name"
                                className="border outline-none border-brand_primary-50 rounded-md p-3"
                              />
                              <ErrorMessage
                                name={`missions.${index}.name`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="flex flex-col flex-1">
                              <label className="text-sm font-bold mb-2">
                                Flight Number
                              </label>
                              <Field
                                name={`missions.${index}.flight`}
                                type="number"
                                placeholder="Flight Number"
                                className="border outline-none border-brand_primary-50 rounded-md p-3"
                              />
                              <ErrorMessage
                                name={`missions.${index}.flight`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <button
                              type="button"
                              className="text-red-500 font-bold"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="bg-blue-500 text-white py-2 px-4 rounded"
                          onClick={() => push({ name: "", flight: undefined })}
                        >
                          Add Mission
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <button
                  type="submit"
                  className="bg-brand_primary-50 text-white py-3 px-8 rounded-xl"
                >
                  Add Capsule
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AddCapsuleModal;
