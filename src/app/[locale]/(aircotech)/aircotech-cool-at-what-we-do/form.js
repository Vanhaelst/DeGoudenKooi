"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import { sendMail } from "@/server/brevo/sendMail";

import { Text } from "@/components/atoms";

export const Form = ({ t }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      mail: "",
      message: "",
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendMail({
        data,
        templateId: 1,
      });

      setShowSuccessMessage(true);
      reset();
      setIsSubmitting(false);
    } catch (e) {
      setShowErrorMessage(true);
      setIsSubmitting(false);
      console.error(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div>
        <label
          htmlFor="firstname"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {t.firstname}{" "}
          <span className="text-red-500 font-normal text-xs">
            ({t.required})
          </span>
        </label>
        <div className="mt-2">
          <input
            className="block w-full   bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register("firstname", { required: true })}
          />{" "}
          {errors.firstname?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t.validation[errors.firstname.type]}
            </Text>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="lastname"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {t.lastname}{" "}
          <span className="text-red-500 font-normal text-xs">
            ({t.required})
          </span>
        </label>
        <div className="mt-2">
          <input
            {...register("lastname", { required: true })}
            className="block w-full   bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />{" "}
          {errors.lastname?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t.validation[errors.lastname.type]}
            </Text>
          )}
        </div>
      </div>
      <div className="col-span-2">
        <label
          htmlFor="mail"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {t.mail}{" "}
          <span className="text-red-500 font-normal text-xs">
            ({t.required})
          </span>
        </label>
        <div className="mt-2">
          <input
            {...register("mail", { required: true })}
            className="block w-full   bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.mail?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t.validation[errors.mail.type]}
            </Text>
          )}
        </div>
      </div>
      <div className="col-span-2">
        <label
          htmlFor="message"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {t.message}{" "}
          <span className="text-red-500 font-normal text-xs">
            ({t.required})
          </span>
        </label>
        <Text level="xs">{t.message_description}</Text>

        <div className="mt-2">
          <textarea
            {...register("message", { required: true })}
            rows={6}
            className="block w-full resize-none bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.message?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t.validation[errors.message.type]}
            </Text>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            "rounded-full px-6 py-3 uppercase font-semibold tracking-wide",
            "bg-orange-500 text-white",
            "hover:bg-orange-700 transition-all",
            isSubmitting && "bg-gray-500 hover:bg-gray-500 cursor-not-allowed",
          )}
        >
          {t.send}
        </button>
      </div>
    </form>
  );
};
