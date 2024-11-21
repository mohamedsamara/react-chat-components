/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  RefObject,
} from "react";

import useStore from "lib/stores";
import {
  AttachmentViewerParams,
  MsgAttachmentType,
  ChatMember,
} from "lib/types";

type CopyStatus = "inactive" | "copied" | "failed";
export const useCopyToClipboard = (
  text: string,
  notifyTimeout = 2500
): [CopyStatus, () => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("inactive");
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus("copied"),
      () => setCopyStatus("failed")
    );
  }, [text]);

  useEffect(() => {
    if (copyStatus === "inactive") {
      return;
    }
    const timeoutId = setTimeout(
      () => setCopyStatus("inactive"),
      notifyTimeout
    );
    return () => clearTimeout(timeoutId);
  }, [copyStatus]);

  return [copyStatus, copy];
};

type FunctionType = (...args: any[]) => void;
export const useDebounce = <T extends FunctionType>(
  callback: T,
  delay = 200
) => {
  const callbackRef = useRef<T | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFunction = (...args: any[]) => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (!callbackRef.current) return;

      callbackRef.current(...args);
    }, delay);
  };

  return debouncedFunction;
};

export const useReplyScrollSpy = () => {
  const { replyScroll, setReplyScroll } = useStore();

  const [element, setElement] = useState<HTMLElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) =>
          setReplyScroll({ ...replyScroll, visible: entry.isIntersecting }),
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        }
      ),
    [replyScroll]
  );

  useEffect(() => {
    if (!element) return;
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  useEffect(() => {
    if (replyScroll.visible) {
      timerRef.current = setTimeout(() => reset(), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [replyScroll.visible]);

  const reset = async () => {
    if (element) observer.unobserve(element);
    setElement(null);
    setReplyScroll({ ...replyScroll, visible: false, id: "" });
  };

  const scrollToMsg = (id: string) => {
    const element = document.getElementById(`msg-${id}`);
    if (!element) return;
    setReplyScroll({ ...replyScroll, id });
    setElement(element);
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const onReplyClick = useDebounce((id) => scrollToMsg(id));

  return { reply: replyScroll, scrollToMsg: onReplyClick };
};

export const useAttachmentViewer = () => {
  const { attachmentViewer, setAttachmentViewer } = useStore();

  const openViewer = (params: AttachmentViewerParams) =>
    setAttachmentViewer({ visible: true, params });
  const closeViewer = () =>
    setAttachmentViewer({ visible: false, params: null });

  return { attachmentViewer, openViewer, closeViewer };
};

export const useIsAttachmentViewable = (type: MsgAttachmentType) => {
  const isNotAllowed = type === "FILE" || type === "AUDIO";
  return { isViewable: !isNotAllowed };
};

export const useIsPreviewAttachment = (type: MsgAttachmentType) => {
  const isPreview = type === "VIDEO";
  return { isPreview };
};

type Handler = (event: MouseEvent) => void;
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

export const useDimension = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const getDimensions = () => ({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return dimensions;
};

export type GroupDetailsFormValues = {
  photo: File | null;
  name: string;
};

export const useGroupDetailsForm = (initialState?: GroupDetailsFormValues) => {
  const [groupDetails, setGroupDetails] = useState<GroupDetailsFormValues>({
    name: initialState?.name || "",
    photo: null,
  });

  const onNameChange = (value: string) => {
    setGroupDetails({ ...groupDetails, name: value });
  };

  const onPhotoChange = (photo: File) => {
    setGroupDetails({ ...groupDetails, photo });
  };

  const resetGroupDetailsForm = () => {
    setGroupDetails({ name: "", photo: null });
  };

  return { groupDetails, onPhotoChange, onNameChange, resetGroupDetailsForm };
};

export const useGroupMembersForm = () => {
  const [selectedMembers, setSelectedMembers] = useState<ChatMember[]>([]);

  const onMemberSelectChange = (isSelected: boolean, member: ChatMember) => {
    if (isSelected) {
      setSelectedMembers([...selectedMembers, member]);
    } else {
      setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id));
    }
  };

  const resetGroupMembersForm = () => {
    setSelectedMembers([]);
  };

  return { selectedMembers, resetGroupMembersForm, onMemberSelectChange };
};
