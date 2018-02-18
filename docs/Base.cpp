#include "DxLib.h"
#include "Base.h"

double scaleX;
double scaleY;

bool Area::pre_lclick_status = true;
bool Area::pre_hitkey_status = true;
void Area::Update()
{
    pre_lclick_status = GetMouseInput() & MOUSE_INPUT_LEFT;
    pre_hitkey_status = (CheckHitKeyAll() != 0);
}

bool Area::IsMouseOver()
{
    int mouse_x, mouse_y;

    GetMousePoint(&mouse_x, &mouse_y);
    if (x1 < mouse_x && mouse_x < x2 && y1 < mouse_y && mouse_y < y2)
        return true;

    return false;
}

bool Area::IsClicked()
{
    if (!pre_lclick_status && IsMouseOver() && (GetMouseInput() & MOUSE_INPUT_LEFT)) {
        is_clicking = true;
        return true;
    }

    return false;
}

bool Area::IsClicking()
{
    return is_clicking = is_clicking && IsMouseOver();
}
