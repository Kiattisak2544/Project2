import Modal from '../ui/Modal';
import RequesterInfo from '../../pages/RequesterInfo';

const closeBtn =
  'w-8 h-8 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 hover:rotate-90 transition-all duration-300 cursor-pointer';
const secondaryBtn = 'px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition cursor-pointer';

// ---------- ข้อมูลส่วนตัว ----------
export function ProfileModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      {(close) => (
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-800">ข้อมูลส่วนตัว</h3>
            <button type="button" onClick={close} className={closeBtn} aria-label="ปิด">✕</button>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <RequesterInfo />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={close} className={secondaryBtn}>ปิด</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ---------- การตั้งค่า ----------
export interface Settings {
  reduceMotion: boolean;
  showToasts: boolean;
}

interface SettingsModalProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
  onClose: () => void;
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <label className="flex items-center justify-between gap-4 p-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 transition cursor-pointer">
      <span>
        <span className="block text-xs font-semibold text-slate-800">{label}</span>
        <span className="block text-[11px] text-slate-400 mt-0.5">{hint}</span>
      </span>
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="relative shrink-0 w-10 h-6 rounded-full bg-slate-200 transition-colors duration-300 peer-checked:bg-linear-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600 peer-focus-visible:ring-4 peer-focus-visible:ring-blue-500/20 after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 peer-checked:after:translate-x-4" />
    </label>
  );
}

export function SettingsModal({ settings, onChange, onClose }: SettingsModalProps) {
  return (
    <Modal onClose={onClose}>
      {(close) => (
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-800">การตั้งค่าบัญชี</h3>
            <button type="button" onClick={close} className={closeBtn} aria-label="ปิด">✕</button>
          </div>
          <div className="space-y-2 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <Toggle
              label="ลดแอนิเมชัน"
              hint="ปิดการเคลื่อนไหวเพื่อความเร็ว หรือลดอาการเวียนหัว"
              checked={settings.reduceMotion}
              onChange={(v) => onChange({ ...settings, reduceMotion: v })}
            />
            <Toggle
              label="แสดงการแจ้งเตือน"
              hint="แจ้งเตือนมุมขวาบนเมื่อบันทึกหรืออนุมัติรายการ"
              checked={settings.showToasts}
              onChange={(v) => onChange({ ...settings, showToasts: v })}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={close} className={secondaryBtn}>เสร็จสิ้น</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ---------- ยืนยันออกจากระบบ ----------
export function LogoutModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <Modal onClose={onClose} maxWidth="max-w-sm">
      {(close) => (
        <div className="p-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 text-2xl flex items-center justify-center animate-pop-in">🚪</div>
          <h3 className="mt-4 text-base font-bold text-slate-800">ออกจากระบบ?</h3>
          <p className="mt-1 text-xs text-slate-500">คุณต้องการออกจากระบบ (Log out) ใช่หรือไม่</p>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button type="button" onClick={close} className={secondaryBtn}>ยกเลิก</button>
            <button
              type="button"
              onClick={onConfirm}
              className="shine px-4 py-2 text-xs font-semibold text-white rounded-xl bg-linear-to-r from-rose-500 to-red-600 shadow-lg shadow-rose-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
